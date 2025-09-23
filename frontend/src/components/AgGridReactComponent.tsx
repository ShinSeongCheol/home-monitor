import { AG_GRID_LOCALE_KR } from "@ag-grid-community/locale";
import { type SizeColumnsToFitGridStrategy, themeBalham } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";

type AgGridReactComponentProps = {
    colDefs: any[]
    rowData: any[];
}

const AgGridReactComponent = ({colDefs, rowData}: AgGridReactComponentProps) => {

    const agGridRef = useRef<AgGridReact | null>(null);
        
    const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy >(() => {
            return {
                type: 'fitGridWidth',
                defaultMinWidth: 100,
                columnLimits: [
                ]
            };
    }, []);
    
    return(
        <AgGridReact ref={agGridRef} theme={themeBalham} autoSizeStrategy={autoSizeStrategy} columnDefs={colDefs} rowData={rowData} pagination={true} localeText={AG_GRID_LOCALE_KR} />
    )
}

export default AgGridReactComponent;