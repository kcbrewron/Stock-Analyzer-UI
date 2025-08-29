import { json } from '@sveltejs/kit';

export async function POST({ request, platform }) {
    const { ticker } = await request.json();
    if (!ticker) {
        return json({ error: 'Ticker symbol is required' }, { status: 400 });
    }   
    console.log("Ticker received in POST request:", ticker);

    // Check for DO binding
    if (!platform.env.STOCK_ANALYSIS_SERVICE) {
        return json({ error: 'Durable Object binding not found' }, { status: 500 });
    }

    try {

        const response = await platform.env.STOCK_ANALYSIS_SERVICE.fetch('https://stock-analysis/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticker })
        });

        const result = await response.json();
        console.log("Response from Durable Object:", JSON.stringify(result));

        return json({ message: `Analysis started for ticker: ${ticker}`, data: result });
    } catch (error) {
        console.error('Error during stock analysis:', error);
        return json({ error: 'Failed to start stock analysis' }, { status: 500 });
    }

}