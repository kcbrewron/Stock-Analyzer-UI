import { DurableObject } from "cloudflare:workers";

export class StockAnalysisDurableObject extends DurableObject {
    constructor(ctx, env) {
        super(ctx, env);
        this.storage = ctx.storage;
    }

    async getCompanyInformation(ticker) {
        const response = await fetch(`https://api.example.com/company/${ticker}`);
        const data = await response.json();
        return data;
    }

    async getStockPriceHistory(ticker) {
        const response = await fetch(`https://api.example.com/price-history/${ticker}`);
        const data = await response.json();
        return data;
    }

    async getFinancialStatements(ticker) {
        const response = await fetch(`https://api.example.com/financials/${ticker}`);
        const data = await response.json();
        return data;
    }

    async getNewsArticles(ticker) {
        const response = await fetch(`https://api.example.com/news/${ticker}`);
        const data = await response.json();
        return data;
    }

    async getAnalystRatings(ticker) {
        const response = await fetch(`https://api.example.com/ratings/${ticker}`);
        const data = await response.json();
        return data;
    }

    async getSocialMediaSentiment(ticker) {
        const response = await fetch(`https://api.example.com/sentiment/${ticker}`);
        const data = await response.json();
        return data;
    }

    async analyze(ticker) {
        console.log("Creating analysis entry for ticker:", ticker);
        
        // Create analysis ID
        const analysisId = Date.now().toString();
        
        // Store analysis data using key-value storage
        const analysisData = {
            ticker,
            status: 'created',
            lastUpdated: new Date().toISOString(),
            analysisLastExecuted: new Date().toISOString(),
            steps: [
                { step: 'get_company_information', status: 'not started' },
                { step: 'get_price_history', status: 'not started' },
                { step: 'get_news', status: 'not started' },
                { step: 'get_analyst_ratings', status: 'not started' },
                { step: 'get_social_media_sentiment', status: 'not started' },
                { step: 'complete_analysis', status: 'not started' }
            ]
        };
        
        // Store in Durable Object storage
        await this.storage.put(`analysis:${analysisId}`, analysisData);
        await this.storage.put(`ticker:${ticker}:latest`, analysisId);
        
        console.log("Analysis created with ID:", analysisId);
        return analysisId;
    }

    async getLastAnalysis(ticker) {
        const analysisId = await this.storage.get(`ticker:${ticker}:latest`);
        if (!analysisId) return null;
        
        const analysis = await this.storage.get(`analysis:${analysisId}`);
        return analysis;
    }

    // Add fetch handler for HTTP requests to the Durable Object
    async fetch(request) {
        const url = new URL(request.url);
        
        if (request.method === 'POST' && url.pathname === '/analyze') {
            const { ticker } = await request.json();
            const analysisId = await this.analyze(ticker);
            return new Response(JSON.stringify({ 
                success: true, 
                analysisId, 
                message: `Analysis started for ticker: ${ticker}` 
            }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response('Not found', { status: 404 });
    }

}
