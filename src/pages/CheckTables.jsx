import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CheckTables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTables() {
      const tablesToCheck = [
        'lesson_progress',
        'bookmarks',
        'lesson_notes',
        'live_lessons',
        'enrollments',
        'courses',
        'modules',
        'lessons'
      ];
      
      const results = [];
      
      for (const table of tablesToCheck) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);
          
          if (error) {
            results.push({
              name: table,
              exists: false,
              error: error.message
            });
          } else {
            results.push({
              name: table,
              exists: true,
              count: data?.length || 0
            });
          }
        } catch (err) {
          results.push({
            name: table,
            exists: false,
            error: err.message
          });
        }
      }
      
      setTables(results);
      setLoading(false);
    }
    
    checkTables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking Supabase tables...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Supabase Tables Check</h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Table Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tables.map((table) => (
                <tr key={table.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{table.name}</td>
                  <td className="px-6 py-4">
                    {table.exists ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✅ Exists
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ❌ Not Found
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {table.exists ? (
                      `Has ${table.count} record(s)`
                    ) : (
                      table.error || 'Table does not exist'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">📝 Next Steps</h2>
          <p className="text-blue-700 text-sm">
            Based on the results above, we'll need to create any missing tables.
            Share the output and I'll provide the SQL to create them!
          </p>
        </div>
      </div>
    </div>
  );
}