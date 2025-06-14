import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fields = [
  { label: 's_no', type: 'number' },
  { label: 'created_at', type: 'date' },
  { label: 'campaign_name', type: 'text' },
  { label: 'install_count', type: 'number' },
  { label: 'channel', type: 'text' },
  { label: 'network', type: 'text' },
  { label: 'offer_id', type: 'text' },
  { label: 'event_name', type: 'text' },
  { label: 'event_count', type: 'number' },
  { label: 'event_day', type: 'number' },
  // { label: 'revenue', type: 'number' },
  // { label: 'currency', type: 'text' },
];


const Dashboard = () => {
  const [filters, setFilters] = useState([{ field: 'campaign_name', operator: 'like', value: '' }]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');



  // useEffect(() => {
  //   axios.get('http://54.70.36.111/backend/stats')
  //     .then(res => {
  //       setData(res.data);
  //       setFilteredData(res.data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError('Failed to fetch data. Using mock data.');
  //       alert('Failed to fetch data. Using mock data.');
  //       // setData(mockData);
  //       // setFilteredData(mockData);
  //       setLoading(false);
  //     });
  // }, []);


  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get('http://54.70.36.111/backend/stats');
      const raw = res.data?.data || {};
      const flattened = [];

      Object.entries(raw).forEach(([campaign_name, campaigns]) => {
        console.log({campaign_name, campaigns});

        Object.entries(campaigns).forEach(([offers, dates]) => {
          const [channel, network, offer_id] = offers.split('::');

          Object.entries(dates).forEach(([date, values]) => {
            const installs = values.installs || 0;
            const events = values.events || {};

            Object.entries(events).forEach(([event_name, dayCounts]) => {
              Object.entries(dayCounts).forEach(([event_day, event_count]) => {
                flattened.push({
                  s_no: flattened.length + 1,
                  created_at: date,
                  campaign_name,
                  install_count: installs,
                  channel,
                  network,
                  offer_id,
                  event_name,
                  event_day: parseInt(event_day),
                  event_count,
                  // revenue: '',  // Not in response
                  // currency: '', // Not in response
                });

                // console.log({flattened});
              });
            });
          });
        });
      });

      setData(flattened);
      setFilteredData(flattened);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from server.');
      alert('Failed to fetch data from server.');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const handleFilterChange = (index, key, val) => {
    const updated = [...filters];
    updated[index][key] = val;
    setFilters(updated);
  };

  const addFilter = () => {
    setFilters([...filters, { field: 'campaign_name', operator: 'like', value: '' }]);
  };

  const applyFilters = () => {
    const result = data.filter(row => {
      return filters.every(({ field, operator, value }) => {
        const fieldValue = row[field];
        if (fieldValue === undefined) return false;

        switch (operator) {
          case '=':
            return String(fieldValue) === value;
          case '<=':
            return parseFloat(fieldValue) <= parseFloat(value);
          case '>=':
            return parseFloat(fieldValue) >= parseFloat(value);
          case '<':
            return parseFloat(fieldValue) < parseFloat(value);
          case '>':
            return parseFloat(fieldValue) > parseFloat(value);
          case 'like':
            return String(fieldValue).toLowerCase().includes(value.toLowerCase());
          default:
            return false;
        }
      });
    });

    setFilteredData(result);
    setCurrentPage(1);
  };

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const exportData = () => {
    if (exportFormat === 'csv') {
      const csvHeaders = Object.keys(data[0] || {}).join(',');
      const csvRows = filteredData.map(row => Object.values(row).map(val => `"${val}"`).join(',')).join('\n');
      const csvContent = [csvHeaders, csvRows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'filtered_data.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (exportFormat === 'json') {
      const jsonContent = JSON.stringify(filteredData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'filtered_data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-1">📊 Campaign Analytics Dashboard</h1>
      </header>

      <section className="bg-white p-6 rounded-xl shadow mb-8 border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">🔍 Search & Filter</h2>
        {filters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mb-4 bg-blue-100 rounded-lg px-4 py-3 shadow-sm border border-blue-200"
          >
            <select
              value={filter.field}
              onChange={e => handleFilterChange(index, 'field', e.target.value)}
              className="p-2 border border-blue-300 rounded w-48"
            >
              {fields.map(f => (
                <option key={f.label} value={f.label}>{f.label}</option>
              ))}
            </select>

            <select
              value={filter.operator}
              onChange={e => handleFilterChange(index, 'operator', e.target.value)}
              className="p-2 border border-blue-300 rounded w-28"
            >
              <option value="=">=</option>
              <option value="<=">&le;</option>
              <option value=">=">&ge;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
              <option value="like">like</option>
            </select>

            <input
              type="text"
              value={filter.value}
              onChange={e => handleFilterChange(index, 'value', e.target.value)}
              placeholder={`Enter value`}
              className="p-2 border border-blue-300 rounded w-full max-w-md"
            />

            <button
              onClick={() => {
                const updated = [...filters];
                updated[index].value = '';
                setFilters(updated);
              }}
              className="text-yellow-600 hover:text-yellow-800"
              title="Clear this filter"
            >
              ❌
            </button>

            <button
              onClick={() =>
                setFilters(filters.length === 1
                  ? [{ field: 'campaign_name', operator: 'like', value: '' }]
                  : filters.filter((_, i) => i !== index)
                )
              }
              className="text-red-600 hover:text-red-800"
              title="Remove this filter"
            >
              🗑️
            </button>
          </div>
        ))}

        <div className="flex flex-wrap gap-4 mt-4 items-center">
          <button onClick={addFilter} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">+ Add Filter</button>
          <button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">Apply Filters</button>
          <button onClick={() => setFilteredData(data)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition">Clear All</button>

          <div className="flex items-center gap-2">
            <label htmlFor="exportFormat" className="text-blue-800 font-medium">Export as:</label>
            <select
              id="exportFormat"
              value={exportFormat}
              onChange={e => setExportFormat(e.target.value)}
              className="border border-blue-300 rounded px-2 py-1"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
            <button onClick={exportData} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition">Export</button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow border border-blue-200">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm text-blue-800">
            Show
            <select
              className="mx-2 border border-blue-300 rounded px-2 py-1"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[10, 25, 50, 100].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            rows per page
          </label>
          <div className="text-sm text-blue-800">
            Page {currentPage} of {totalPages}
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="ml-2 px-2 py-1 border rounded disabled:opacity-50">Prev</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="ml-2 px-2 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-200 text-blue-900">
              <tr>
                {Object.keys(data[0] || {}).map(header => (
                  <th
                    key={header}
                    className="px-4 py-2 border text-left font-semibold cursor-pointer"
                    onClick={() => handleSort(header)}
                  >
                    {header} {sortConfig.key === header ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    {Object.values(row).map((val, idx) => (
                      <td key={idx} className="px-4 py-2 border text-sm text-blue-900">
                        {typeof val === 'object' ? JSON.stringify(val) : val}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={fields.length} className="text-center py-6 text-blue-500">
                    No data found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;