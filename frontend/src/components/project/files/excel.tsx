import { useEffect, useState } from "react";
import Papa from "papaparse";

import { IOpenFileProps } from "@/utils/types";

type CSVRow = Record<string, string>;

export default function ExcelFile({
  fileName,
  projectId,
  userId,
}: IOpenFileProps) {
  const [data, setData] = useState<CSVRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  console.table(data);

  useEffect(() => {
    const loadCSV = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_FILES}/${userId}/${projectId}/${fileName}`
      );
      const csvText = await response.text();

      const parsed = Papa.parse<CSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      if (parsed.meta.fields) {
        setHeaders(parsed.meta.fields);
      }

      setData(parsed.data);
    };

    loadCSV();
  }, [fileName, projectId, userId]);

  return (
    <div className=" w-full h-full overflow-y-auto pl-8 ">
      {data.length === 0 ? (
        <p>Carregando CSV...</p>
      ) : (
        <table className="w-full border-collapse border bg-yellow-400 text-sm">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header) => (
                <th
                  key={header}
                  className="border px-4 py-2 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {headers.map((header) => (
                  <td key={header} className="border px-4 py-2">
                    {row[header] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
