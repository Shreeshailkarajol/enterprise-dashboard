import api from "../../../api/client"
import type { DashboardSummary } from "../types/dashboard.dto"


export const DashboardService ={
    async getSummary () : Promise<DashboardSummary> {
        const response = await api.get('/dashboard/summary')

        return response.data
    }   
}