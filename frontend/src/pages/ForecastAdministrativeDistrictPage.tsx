import { useCallback, useEffect, useRef, useState, type ChangeEventHandler, type FormEventHandler } from "react";
import { type ColDef } from 'ag-grid-community';
import * as XLSX from "xlsx";
import { useAuth } from "../contexts/AuthContext";
import styles from '../styles/pages/ForecastAdministrativeDistrictPage.module.css';
import { ChevronRight, Download, File, Upload } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import AgGridReactComponent from "../components/AgGridReactComponent";
import type { AgGridReact } from "ag-grid-react";
import { MenuType, SideMenuType } from "../layouts/BackOfficeLayout";
import useBackOfficeMenu from "../hooks/useBackOfficeMenu";

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
    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Weather,
            sideMenu: SideMenuType.AdministrativeDistrict
        });
    }, []);
    
    const agGridRef = useRef<AgGridReact | null>(null);

    const { accessToken } = useAuth();

    const [rowData, setRowData] = useState<AdministartiveDistrict[]>([
    ]);

    const [colDefs] = useState<ColDef<AdministartiveDistrict>[]>([
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

    const onSubmitExcel: FormEventHandler = (event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/forecast/administrativeDistrict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(rowData)
        });
    }

    const onChangeExcel: ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;

        if (!files) return;
        
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
        })
        .catch(error => {
            throw new Error(error);
        });
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/forecast/administrativeDistrict`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        .then(res => res.json())
        .then(data => setRowData(data));
    }, [])

    const handleCsvDownload = useCallback(() => {
        console.log(agGridRef)
        if(!agGridRef.current) return;

        const pad = (n: number) => n.toString().padStart(2, "0");

        const date = new Date();
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const dayOfMonth = pad(date.getDate());
        const hours = pad(date.getHours())
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        agGridRef.current.api.exportDataAsCsv({fileName: `행정구역코드 ${year}${month}${dayOfMonth}_${hours}${minutes}${seconds}.csv`});
    }, [])

    return (
        <section className={styles.section}>
            
            <form id="form" className={styles.form} onSubmit={onSubmitExcel}>

                <nav className={styles.breadcrumb} aria-label="breadcrumb">
                    <ol>
                        <li><Link to={'/backoffice'}>관리자</Link></li>
                        <ChevronRight size={16} color="black" strokeWidth={1} />
                        <li>기상 데이터 관리</li>
                        <ChevronRight size={16} color="black" strokeWidth={1} />
                        <li aria-current="page">행정 구역 코드</li>
                    </ol>
                </nav>

                <div className={styles.buttonContainer}>
                    <label className={styles.fileUploadLabel} htmlFor="fileInput"> <File size={16} color="white" fill="white" strokeWidth={1} /> 엑셀 불러오기</label>
                    <input className={styles.fileInputButton} type="file" name="fileInput" id="fileInput" onChange={onChangeExcel} />
                    <button className={styles.fileUploadButton} type="submit"><Upload size={16} color="white" fill="white" strokeWidth={1} />업로드</button>
                    <label className={styles.fileUploadLabel} onClick={handleCsvDownload}> <Download size={16} color="white" fill="white" strokeWidth={1} /> CSV 다운로드</label>
                </div>

                <AgGridReactComponent ref={agGridRef} colDefs={colDefs} rowData={rowData}></AgGridReactComponent>
            </form>

        </section>
    )
}

export default ForecastAdministrativeDistrict;