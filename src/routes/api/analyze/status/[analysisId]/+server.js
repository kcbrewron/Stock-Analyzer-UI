import { json } from '@sveltejs/kit';

/**
 * GET endpoint to check the status of a running analysis
 * @param {Object} params - Route parameters containing analysisId
 * @param {Object} platform - Cloudflare platform object with bindings
 * @returns {Response} JSON response with analysis status
 */
export async function GET({ params, platform }) {
    const { analysisId } = params;
    
    if (!analysisId) {
        return json({ error: 'Analysis ID is required' }, { status: 400 });
    }

    // Check for DO binding
    if (!platform.env.STOCK_ANALYSIS_SERVICE) {
        return json({ error: 'Analysis service not available' }, { status: 500 });
    }

    try {
        const response = await platform.env.STOCK_ANALYSIS_SERVICE.fetch(`https://stock-analysis/status/${analysisId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        
        return json(result);
    } catch (error) {
        console.error('Error fetching analysis status:', error);
        return json({ error: 'Failed to fetch analysis status' }, { status: 500 });
    }
}