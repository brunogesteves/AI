import { useChatInfo } from "@/contexts/contextChat";
import * as XLSX from "xlsx";

import { IoCloseCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ExcelFile() {
  const { slug, fileName, setIsModalopen } = useChatInfo();

  const [data, setData] = useState<unknown[]>([]);
  useEffect(() => {
    // Fetch Excel file.
    fetch(`${process.env.NEXT_PUBLIC_FILE_SOURCE}/9/excel.xlsx`)
      // Convert to ArrayBuffer.
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const wb = XLSX.read(data, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        // Convert to JSON.
        const json = XLSX.utils.sheet_to_json(ws);
        setData(json);
      });
  }, []);
  // return data;

  console.log(data);
  return (
    <div className="bg-white w-[calc(100vw_-_15vw)] h-[calc(100vh_-_14vh)] overflow-y-auto">
      {data.length > 0 && (
        <table>
          <thead></thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row as string).map((value, index) => (
                  <td key={index} className="w-96">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="absolute top-3 left-3"
        onClick={() => setIsModalopen(false)}
      >
        <IoCloseCircleSharp color="red" />
      </button>
    </div>
  );
}
