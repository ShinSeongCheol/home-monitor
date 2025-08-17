import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState, type ChangeEventHandler, type FormEventHandler } from "react";
import { themeBalham, type ColDef, type SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale'
import * as XLSX from "xlsx";

interface AdministartiveDistrict {
    type: string;
    code: number | string;
    level1: string;
    level2: string;
    level3: string;
    x: number | string;
    y: number | string;
    longitude_degrees: number | string;
    longitude_minutes: number | string;
    longitude_seconds: number | string;
    latitude_degrees: number | string;
    latitude_minutes: number | string;
    latitude_seconds: number | string;
    longitude: number | string;
    latitude: number | string;
    updatedAt: String
}

const ForecastAdministrativeDistrict = () => {
    const agGridRef = useRef<AgGridReact | null>(null);

    const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy>(() => {
        return {
            type: 'fitGridWidth',
            defaultMinWidth: 100,
            // defaultMaxWidth: 100,
            columnLimits: [
            ]
        };
    }, []);

    const [rowData, setRowData] = useState<AdministartiveDistrict[]>([
    ]);

    const [colDefs, setColDefs] = useState<ColDef<AdministartiveDistrict>[]>([
        { field: "type", headerName: "구분", filter: true},
        { field: "code", headerName: "행정구역코드", filter: true },
        { field: "level1", headerName: "1단계", filter: true },
        { field: "level2", headerName: "2단계", filter: true },
        { field: "level3", headerName: "3단계", filter: true },
        { field: "x", headerName: "격자 X" },
        { field: "y", headerName: "격자 Y" },
        { field: "longitude_degrees", headerName: "경도 (시)" },
        { field: "longitude_minutes", headerName: "경도 (분)" },
        { field: "longitude_seconds", headerName: "경도 (초)" },
        { field: "latitude_degrees", headerName: "위도 (시)" },
        { field: "latitude_minutes", headerName: "위도 (분)" },
        { field: "latitude_seconds", headerName: "위도 (초)" },
        { field: "longitude", headerName: "경도 (초/100)" },
        { field: "latitude", headerName: "위도 (초/100)" },
        { field: "updatedAt", headerName: "위치업데이트" },
    ]);

    const onSubmitExcel: FormEventHandler = (event) => {
        event.preventDefault();
    
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/forecast/administrativeDistrict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rowData)
        });
    }

    const onChangeExcel: ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;

        if (files)
            files[0].arrayBuffer()
                .then(data => {
                    return new Uint8Array(data);
                })
                .then(data => {
                    const workbook = XLSX.read(data);
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A", range: 1 }) as { [key: string]: any }[]
                    const mappedData: AdministartiveDistrict[] = jsonData.map((data) => {
                        return {
                            type: data['A'],
                            code: data['B'],
                            level1: data['C'],
                            level2: data['D'],
                            level3: data['E'],
                            x: data['F'],
                            y: data['G'],
                            longitude_degrees: data['H'],
                            longitude_minutes: data['I'],
                            longitude_seconds: data['J'],
                            latitude_degrees: data['K'],
                            latitude_minutes: data['L'],
                            latitude_seconds: data['M'],
                            longitude: data['N'],
                            latitude: data['O'],
                            updatedAt: data['P'] ? String(data['P']) : '',
                        }
                    });


                    setRowData(mappedData);
                })
                .catch(error => {
                    throw new Error(error);
                });
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/forecast/administrativeDistrict`)
        .then(res => res.json())
        .then(data => setRowData(data))
        ;
    }, [])

    useEffect(() => {
        const gridApi = agGridRef.current?.api;
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    }, [rowData]);

    return (
        <>
            <form id="form" style={{ width: "100%", height: "720px", padding: "10px" }} onSubmit={onSubmitExcel}>
                <AgGridReact ref={agGridRef} theme={themeBalham} autoSizeStrategy={autoSizeStrategy} columnDefs={colDefs} rowData={rowData} pagination={true} localeText={AG_GRID_LOCALE_KR} />
                <input type="file" name="" id="" onChange={onChangeExcel} />
                <input type="submit" value="업로드" />
            </form>
        </>
    )
}

export default ForecastAdministrativeDistrict;