export default function Documents({ data }: { data: any[]}) {
  return (
    <div className="mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Object.keys(data[data.length - 1] || {}).map((key, index) => (
              <th
                key={index}
                align="left"
                className="py-2 px-4 border border-gray-300 bg-gray-200 font-semibold text-black"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="py-2 px-4 border border-gray-300 text-black">
                  {/* @ts-ignore */}
                  {JSON.stringify(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}