import {type ChangeEvent, useEffect, useRef, useState} from "react";
import type {AgGridReact} from "ag-grid-react";
import {useAuth} from "../../../../shared";
import {useFormattedDate} from "../../../../shared/lib";
import {postAdministrativeDistrict} from "../api/postAdministrativeDistrict.ts";
import * as XLSX from "xlsx";
import {getAdministrativeDistrict} from "../api/getAdministrativeDistrict.ts";
import type {AdministarativeDistrict} from "./type.ts";

export const useBackOfficeAdministrativeDistrict = () => {

    const {auth} = useAuth();
    const {formattedDate} = useFormattedDate();

    const agGridComponentRef = useRef<AgGridReact>(null);
    const [colDefs] = useState([
        { field: "type", headerName: "구분", filter: true },
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
    const [rowData, setRowData] = useState<AdministarativeDistrict[]>([]);
    const [_data, setData] = useState();

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) return;

        try {
            const arrayBuffer = await files[0].arrayBuffer()
            const data = new Uint8Array(arrayBuffer);

                const workbook = XLSX.read(data);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A", range: 1 }) as { [key: string]: any }[]
                const mappedData: AdministarativeDistrict[] = jsonData.map((data) => {
                    return {
                        type: data['A'] ? String(data['A']) : '',
                        code: data['B'] ? Number(data['B']) : '',
                        level1: data['C'] ? String(data['C']) : '',
                        level2: data['D'] ? String(data['D']) : '',
                        level3: data['E'] ? String(data['E']) : '',
                        x: data['F'] ? Number(data['F']) : '',
                        y: data['G'] ? Number(data['G']) : '',
                        longitude_degrees: data['H'] ? Number(data['H']) : '',
                        longitude_minutes: data['I'] ? Number(data['I']) : '',
                        longitude_seconds: data['J'] ? Number(data['J']) : '',
                        latitude_degrees: data['K'] ? Number(data['K']) : '',
                        latitude_minutes: data['L'] ? Number(data['L']) : '',
                        latitude_seconds: data['M'] ? Number(data['M']) : '',
                        longitude: data['N'] ? Number(data['N']) : '',
                        latitude: data['O'] ? Number(data['O']) : '',
                        updatedAt: data['P'] ? String(data['P']) : '',
                    }
                });

                setRowData(mappedData);
        } catch(err) {
            console.error(err)
        }
    };

    const handleClickDownload = () => {
        const ref = agGridComponentRef.current;
        if(!ref) return;

        ref.api.exportDataAsCsv({fileName: `행정 구역 코드 ${formattedDate}.csv`});
    };

    const handleClickInsert = async () => {
        try {
            await postAdministrativeDistrict(rowData, auth?.accessToken);
            await fetchAdministrativeDistrict();
            alert('업로드 되었습니다.');
        }catch (err) {
            console.error(err);
        }
    };

    const fetchAdministrativeDistrict = async () => {
        try {
            const data: AdministarativeDistrict[] = await getAdministrativeDistrict(auth?.accessToken);
            setRowData(data);
        }catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchAdministrativeDistrict().catch(console.error);
    }, []);

    return {
        agGridComponentRef,
        colDefs,
        rowData,
        setData,
        handleChangeFile,
        handleClickDownload,
        handleClickInsert
    }
}