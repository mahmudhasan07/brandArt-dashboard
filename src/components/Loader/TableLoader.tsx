import React from 'react';

const TableLoader = ({ columns }: { columns: number }) => {
    return (
        <div className="w-full overflow-auto bg-white rounded-lg shadow-md animate-pulse">
            <table className="w-full mt-5 border-y">
                <thead className="border-b border-gray-200">
                    <tr>
                        {[...Array(columns)].map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-4 first:pl-6 last:pr-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </th>
                        ))}
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        {[...Array(columns)].map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-4 first:pl-6 last:pr-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {[...Array(columns)].map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-4 first:pl-6 last:pr-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {[...Array(columns)].map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-4 first:pl-6 last:pr-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {[...Array(columns)].map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-4 first:pl-6 last:pr-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {[...Array(columns)].map((_, colIndex) => (
                            <th key={colIndex} className="px-4 py-4 first:pl-6 last:pr-6">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </th>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableLoader;