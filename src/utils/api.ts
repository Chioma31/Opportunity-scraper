import axios from 'axios';
import { Opportunity } from '@/types/opportunity';

const API_BASE_URL = 'https://tasck-web-scraper.onrender.com';

export class OpportunityService {
    static async getAllOpportunities(): Promise<Opportunity[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/opportunities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            throw new Error('Failed to fetch opportunities');
        }
    }

    static async getOpportunityById(id: string): Promise<Opportunity | null> {
        try {
            const opportunities = await this.getAllOpportunities();
            return opportunities.find(opp => opp.id === id) || null;
        } catch (error) {
            console.error('Error fetching opportunity:', error);
            return null;
        }
    }
}