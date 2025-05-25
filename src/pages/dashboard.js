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
  { label: 'revenue', type: 'number' },
  { label: 'currency', type: 'text' },
];


const mockData = [{"_id":"6831d01871618d0e1a6c4bd0","s_no":1,"created_at":"2025-05-23 13:05:33","campaign_name":"camp1","install_count":24,"channel":"channel1","network":"network1","offer_id":"offer23","event_name":"event_34","event_count":27,"event_day":1,"event_value":{"4":"f","a":"1"},"revenue":20,"currency":"USD"},{"_id":"6831d01871618d0e1a6c4bd1","s_no":2,"created_at":"2025-05-23 14:15:21","campaign_name":"camp2","install_count":42,"channel":"channel2","network":"network2","offer_id":"offer12","event_name":"event_12","event_count":19,"event_day":3,"event_value":{"2":"b","a":"4"},"revenue":45.5,"currency":"EUR"},{"_id":"6831d01871618d0e1a6c4bd2","s_no":3,"created_at":"2025-05-23 15:25:43","campaign_name":"camp3","install_count":55,"channel":"channel3","network":"network3","offer_id":"offer30","event_name":"event_20","event_count":33,"event_day":5,"event_value":{"5":"c","a":"3"},"revenue":100.75,"currency":"GBP"},{"_id":"6831d01871618d0e1a6c4bd3","s_no":4,"created_at":"2025-05-23 16:35:10","campaign_name":"camp4","install_count":31,"channel":"channel4","network":"network4","offer_id":"offer45","event_name":"event_11","event_count":40,"event_day":2,"event_value":{"3":"a","a":"2"},"revenue":210.9,"currency":"INR"},{"_id":"6831d01871618d0e1a6c4bd4","s_no":5,"created_at":"2025-05-23 17:45:00","campaign_name":"camp5","install_count":29,"channel":"channel5","network":"network5","offer_id":"offer19","event_name":"event_09","event_count":12,"event_day":10,"event_value":{"1":"e","a":"6"},"revenue":50,"currency":"JPY"},{"_id":"6831d01871618d0e1a6c4bd5","s_no":6,"created_at":"2025-05-23 18:55:33","campaign_name":"camp1","install_count":38,"channel":"channel1","network":"network2","offer_id":"offer01","event_name":"event_18","event_count":20,"event_day":7,"event_value":{"7":"d","a":"7"},"revenue":75.35,"currency":"USD"},{"_id":"6831d01871618d0e1a6c4bd6","s_no":7,"created_at":"2025-05-23 20:05:10","campaign_name":"camp2","install_count":44,"channel":"channel2","network":"network3","offer_id":"offer09","event_name":"event_03","event_count":25,"event_day":6,"event_value":{"9":"b","a":"8"},"revenue":150.99,"currency":"EUR"},{"_id":"6831d01871618d0e1a6c4bd7","s_no":8,"created_at":"2025-05-23 21:15:50","campaign_name":"camp3","install_count":60,"channel":"channel3","network":"network1","offer_id":"offer07","event_name":"event_21","event_count":37,"event_day":4,"event_value":{"6":"f","a":"5"},"revenue":88.25,"currency":"GBP"},{"_id":"6831d01871618d0e1a6c4bd8","s_no":9,"created_at":"2025-05-23 22:25:19","campaign_name":"camp4","install_count":49,"channel":"channel4","network":"network5","offer_id":"offer10","event_name":"event_14","event_count":44,"event_day":8,"event_value":{"8":"c","a":"2"},"revenue":132.1,"currency":"INR"},{"_id":"6831d01871618d0e1a6c4bd9","s_no":10,"created_at":"2025-05-23 23:35:33","campaign_name":"camp5","install_count":27,"channel":"channel5","network":"network4","offer_id":"offer05","event_name":"event_05","event_count":31,"event_day":9,"event_value":{"2":"a","a":"9"},"revenue":200,"currency":"USD"},{"_id":"6831d06a71618d0e1a6c4bda","s_no":11,"created_at":"2025-05-24 00:45:00","campaign_name":"camp1","install_count":36,"channel":"channel1","network":"network2","offer_id":"offer08","event_name":"event_08","event_count":22,"event_day":2,"event_value":{"7":"e","a":"3"},"revenue":110.75,"currency":"EUR"},{"_id":"6831d06a71618d0e1a6c4bdb","s_no":12,"created_at":"2025-05-24 01:55:10","campaign_name":"camp2","install_count":61,"channel":"channel2","network":"network3","offer_id":"offer21","event_name":"event_10","event_count":17,"event_day":4,"event_value":{"1":"b","a":"6"},"revenue":95,"currency":"INR"},{"_id":"6831d06a71618d0e1a6c4bdc","s_no":13,"created_at":"2025-05-24 02:05:33","campaign_name":"camp3","install_count":33,"channel":"channel3","network":"network4","offer_id":"offer14","event_name":"event_27","event_count":55,"event_day":7,"event_value":{"3":"f","a":"2"},"revenue":300.65,"currency":"USD"},{"_id":"6831d06a71618d0e1a6c4bdd","s_no":14,"created_at":"2025-05-24 03:15:12","campaign_name":"camp4","install_count":59,"channel":"channel4","network":"network5","offer_id":"offer26","event_name":"event_15","event_count":48,"event_day":3,"event_value":{"5":"d","a":"9"},"revenue":80.3,"currency":"GBP"},{"_id":"6831d06a71618d0e1a6c4bde","s_no":15,"created_at":"2025-05-24 04:25:45","campaign_name":"camp5","install_count":47,"channel":"channel5","network":"network1","offer_id":"offer18","event_name":"event_29","event_count":29,"event_day":5,"event_value":{"6":"c","a":"4"},"revenue":420,"currency":"USD"},{"_id":"6831d06a71618d0e1a6c4bdf","s_no":16,"created_at":"2025-05-24 05:35:00","campaign_name":"camp1","install_count":20,"channel":"channel1","network":"network2","offer_id":"offer33","event_name":"event_06","event_count":24,"event_day":6,"event_value":{"9":"b","a":"8"},"revenue":60.9,"currency":"JPY"},{"_id":"6831d06a71618d0e1a6c4be0","s_no":17,"created_at":"2025-05-24 06:45:20","campaign_name":"camp2","install_count":39,"channel":"channel2","network":"network3","offer_id":"offer40","event_name":"event_01","event_count":21,"event_day":2,"event_value":{"2":"e","a":"6"},"revenue":73.4,"currency":"EUR"},{"_id":"6831d06a71618d0e1a6c4be1","s_no":18,"created_at":"2025-05-24 07:55:33","campaign_name":"camp3","install_count":50,"channel":"channel3","network":"network4","offer_id":"offer29","event_name":"event_04","event_count":26,"event_day":9,"event_value":{"3":"a","a":"1"},"revenue":82.85,"currency":"USD"},{"_id":"6831d06a71618d0e1a6c4be2","s_no":19,"created_at":"2025-05-24 09:05:44","campaign_name":"camp4","install_count":62,"channel":"channel4","network":"network5","offer_id":"offer16","event_name":"event_31","event_count":35,"event_day":4,"event_value":{"7":"f","a":"5"},"revenue":250,"currency":"INR"},{"_id":"6831d06a71618d0e1a6c4be3","s_no":20,"created_at":"2025-05-24 10:15:30","campaign_name":"camp5","install_count":43,"channel":"channel5","network":"network1","offer_id":"offer06","event_name":"event_07","event_count":19,"event_day":8,"event_value":{"6":"d","a":"7"},"revenue":198.99,"currency":"GBP"},{"_id":"6832263e71618d0e1a6c4be4","s_no":21,"created_at":"2024-04-10 09:12:45","campaign_name":"camp1","install_count":58,"channel":"channel1","network":"network3","offer_id":"offer31","event_name":"event_11","event_count":44,"event_day":12,"event_value":{"2":"e","a":"9"},"revenue":175.25,"currency":"USD"},{"_id":"6832263e71618d0e1a6c4be5","s_no":22,"created_at":"2024-04-22 14:21:00","campaign_name":"camp2","install_count":31,"channel":"channel2","network":"network4","offer_id":"offer14","event_name":"event_14","event_count":17,"event_day":3,"event_value":{"6":"c","a":"2"},"revenue":85,"currency":"EUR"},{"_id":"6832263e71618d0e1a6c4be6","s_no":23,"created_at":"2024-04-29 11:33:00","campaign_name":"camp3","install_count":25,"channel":"channel3","network":"network1","offer_id":"offer19","event_name":"event_21","event_count":28,"event_day":6,"event_value":{"8":"a","a":"5"},"revenue":60,"currency":"INR"},{"_id":"6832263e71618d0e1a6c4be7","s_no":24,"created_at":"2024-05-01 16:45:10","campaign_name":"camp4","install_count":38,"channel":"channel4","network":"network2","offer_id":"offer20","event_name":"event_18","event_count":23,"event_day":7,"event_value":{"3":"f","a":"6"},"revenue":102.75,"currency":"JPY"},{"_id":"6832263e71618d0e1a6c4be8","s_no":25,"created_at":"2024-05-10 10:00:00","campaign_name":"camp5","install_count":46,"channel":"channel5","network":"network5","offer_id":"offer24","event_name":"event_12","event_count":50,"event_day":10,"event_value":{"1":"b","a":"4"},"revenue":90,"currency":"GBP"},{"_id":"6832263e71618d0e1a6c4be9","s_no":26,"created_at":"2024-06-15 12:45:30","campaign_name":"camp1","install_count":39,"channel":"channel1","network":"network3","offer_id":"offer25","event_name":"event_22","event_count":31,"event_day":5,"event_value":{"5":"d","a":"7"},"revenue":75,"currency":"USD"},{"_id":"6832263e71618d0e1a6c4bea","s_no":27,"created_at":"2024-07-03 09:33:12","campaign_name":"camp2","install_count":63,"channel":"channel2","network":"network2","offer_id":"offer11","event_name":"event_02","event_count":46,"event_day":6,"event_value":{"6":"e","a":"1"},"revenue":130.9,"currency":"INR"},{"_id":"6832263e71618d0e1a6c4beb","s_no":28,"created_at":"2024-07-15 08:45:22","campaign_name":"camp3","install_count":51,"channel":"channel3","network":"network4","offer_id":"offer32","event_name":"event_08","event_count":42,"event_day":2,"event_value":{"7":"f","a":"8"},"revenue":185,"currency":"EUR"},{"_id":"6832263e71618d0e1a6c4bec","s_no":29,"created_at":"2024-08-20 13:55:55","campaign_name":"camp4","install_count":28,"channel":"channel4","network":"network1","offer_id":"offer02","event_name":"event_05","event_count":34,"event_day":4,"event_value":{"4":"b","a":"3"},"revenue":50,"currency":"USD"},{"_id":"6832263e71618d0e1a6c4bed","s_no":30,"created_at":"2024-09-10 15:00:33","campaign_name":"camp5","install_count":40,"channel":"channel5","network":"network5","offer_id":"offer33","event_name":"event_16","event_count":19,"event_day":3,"event_value":{"2":"c","a":"9"},"revenue":90.25,"currency":"GBP"},{"_id":"6832263e71618d0e1a6c4bee","s_no":31,"created_at":"2024-10-12 17:25:19","campaign_name":"camp1","install_count":34,"channel":"channel1","network":"network2","offer_id":"offer34","event_name":"event_27","event_count":29,"event_day":9,"event_value":{"6":"e","a":"2"},"revenue":110.5,"currency":"USD"},{"_id":"6832263e71618d0e1a6c4bef","s_no":32,"created_at":"2024-11-01 18:40:44","campaign_name":"camp2","install_count":50,"channel":"channel2","network":"network3","offer_id":"offer04","event_name":"event_19","event_count":22,"event_day":8,"event_value":{"9":"a","a":"1"},"revenue":205.75,"currency":"EUR"},{"_id":"6832263e71618d0e1a6c4bf0","s_no":33,"created_at":"2024-11-22 09:00:00","campaign_name":"camp3","install_count":61,"channel":"channel3","network":"network1","offer_id":"offer05","event_name":"event_24","event_count":35,"event_day":5,"event_value":{"3":"b","a":"6"},"revenue":78.9,"currency":"INR"},{"_id":"6832263e71618d0e1a6c4bf1","s_no":34,"created_at":"2024-12-15 21:10:22","campaign_name":"camp4","install_count":55,"channel":"channel4","network":"network2","offer_id":"offer06","event_name":"event_07","event_count":33,"event_day":6,"event_value":{"5":"d","a":"4"},"revenue":160,"currency":"GBP"},{"_id":"6832263e71618d0e1a6c4bf2","s_no":35,"created_at":"2025-01-01 11:11:11","campaign_name":"camp5","install_count":48,"channel":"channel5","network":"network5","offer_id":"offer07","event_name":"event_13","event_count":27,"event_day":1,"event_value":{"8":"f","a":"7"},"revenue":88,"currency":"USD"},{"_id":"6832263e71618d0e1a6c4bf3","s_no":36,"created_at":"2025-02-05 10:45:55","campaign_name":"camp1","install_count":57,"channel":"channel1","network":"network3","offer_id":"offer08","event_name":"event_10","event_count":20,"event_day":3,"event_value":{"4":"c","a":"2"},"revenue":140.45,"currency":"EUR"},{"_id":"6832263e71618d0e1a6c4bf4","s_no":37,"created_at":"2025-03-12 16:00:00","campaign_name":"camp2","install_count":32,"channel":"channel2","network":"network4","offer_id":"offer09","event_name":"event_15","event_count":49,"event_day":8,"event_value":{"7":"e","a":"9"},"revenue":118.2,"currency":"USD"},{"_id":"6832263e71618d0e1a6c4bf5","s_no":38,"created_at":"2025-04-20 19:00:33","campaign_name":"camp3","install_count":44,"channel":"channel3","network":"network1","offer_id":"offer10","event_name":"event_20","event_count":40,"event_day":7,"event_value":{"1":"a","a":"3"},"revenue":99.99,"currency":"JPY"},{"_id":"6832263e71618d0e1a6c4bf6","s_no":39,"created_at":"2025-05-01 14:00:00","campaign_name":"camp4","install_count":36,"channel":"channel4","network":"network5","offer_id":"offer22","event_name":"event_01","event_count":26,"event_day":4,"event_value":{"9":"d","a":"5"},"revenue":105,"currency":"INR"},{"_id":"6832263e71618d0e1a6c4bf7","s_no":40,"created_at":"2025-05-18 12:00:00","campaign_name":"camp5","install_count":67,"channel":"channel5","network":"network2","offer_id":"offer27","event_name":"event_28","event_count":52,"event_day":5,"event_value":{"2":"b","a":"1"},"revenue":212.45,"currency":"USD"}];

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



  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data. Using mock data.');
        alert('Failed to fetch data. Using mock data.');
        setData(mockData);
        setFilteredData(mockData);
        setLoading(false);
      });
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