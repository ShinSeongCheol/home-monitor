import styles from '../styles/components/AgGridReactComponent.module.css';

import { AG_GRID_LOCALE_KR } from "@ag-grid-community/locale";
import { type DateTimeDataTypeDefinition, type SizeColumnsToFitGridStrategy, themeBalham, type ValueFormatterParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";

type AgGridReactComponentProps = {
    colDefs: any[]
    rowData: any[];
}

const AgGridReactComponent = forwardRef<AgGridReact, AgGridReactComponentProps>(({colDefs, rowData}, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const agGridRef = useRef<AgGridReact | null>(null);
        
    const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy >(() => {
            return {
                type: 'fitGridWidth',
                defaultMinWidth: 100,
                columnLimits: [
                ]
            };
    }, []);

    const dataTypeDefinitions = useMemo(() => {
        return {
            dateTime: {
            baseDataType: "dateTime",
            extendsDataType: "dateTime",
            valueFormatter: (params: ValueFormatterParams<Date>) => {
                return params.value ? new Date(params.value).toLocaleString() : "";
            },
            } as DateTimeDataTypeDefinition<Date, any>,
        };
    }, []);

    useImperativeHandle(ref, () => {
        return agGridRef.current as AgGridReact
    }, []);

    useEffect(() => {
        if(!divRef.current) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if(!agGridRef.current?.api) return;

                if (entry.contentRect.width < 1024) 
                    agGridRef.current.api.autoSizeAllColumns();
                else 
                    agGridRef.current.api.sizeColumnsToFit();
            }
        });

        observer.observe(divRef.current);
        return () => observer.disconnect();
    }, [])

    useEffect(() => {
        if(!agGridRef.current?.api) return;
        agGridRef.current.api.sizeColumnsToFit();
    }, [rowData]);
    
    return(
        <div ref={divRef} className={styles.container}>
            <AgGridReact ref={agGridRef} theme={themeBalham} autoSizeStrategy={autoSizeStrategy} columnDefs={colDefs} rowData={rowData} pagination={true} localeText={AG_GRID_LOCALE_KR} dataTypeDefinitions={dataTypeDefinitions} rowSelection={ {mode:'singleRow'}} />
        </div>
    )
});

export default AgGridReactComponent;