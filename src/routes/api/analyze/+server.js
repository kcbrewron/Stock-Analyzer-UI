import { json } from '@sveltejs/kit';

export async function POST({ request, platform }) {
    const { ticker } = await request.json();
    if (!ticker) {
        return json({ error: 'Ticker symbol is required' }, { status: 400 });
    }   
    console.log("Ticker received in POST request:", ticker);

    // Check for DO binding
    if (!platform.env.STOCK_ANALYSIS_DO) {
        return json({ error: 'Durable Object binding not found' }, { status: 500 });
    }

    try {
        // A stub is a client used to invoke methods on the Durable Object
        const stub = platform.env.STOCK_ANALYSIS_DO.get(platform.env.STOCK_ANALYSIS_DO.idFromName("stock-analysis"));

        console.log("Durable Object stub created:", stub);

        // Send the analysis request to the DO
        const response = await stub.analyze(ticker);
        console.log("Response from Durable Object:", response);

        const result = await response.json();
        return json({ message: `Analysis started for ticker: ${ticker}`, data: result });
    } catch (error) {
        console.error('Error during stock analysis:', error);
        return json({ error: 'Failed to start stock analysis' }, { status: 500 });
    }

}