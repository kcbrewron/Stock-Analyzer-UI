import { json } from '@sveltejs/kit';

/**
 * GET endpoint to fetch analysis progress and results
 * @param {Object} params - Route parameters containing analysis id
 * @param {Object} platform - Cloudflare platform object with bindings
 * @returns {Response} JSON response with analysis status and progress
 */
export async function GET({ params, platform }) {
    const { id } = params;
    
    if (!id) {
        return json({ error: 'Analysis ID is required' }, { status: 400 });
    }

    // Check for service binding
    if (!platform.env.STOCK_ANALYSIS_SERVICE) {
        return json({ error: 'Analysis service not available' }, { status: 500 });
    }

    try {
        const response = await platform.env.STOCK_ANALYSIS_SERVICE.fetch(`https://stock-analysis/analysis/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return json({ error: 'Analysis not found' }, { status: 404 });
            }
            throw new Error(`Analysis service error: ${response.status}`);
        }

        const result = await response.json();
        
        return json(result);
    } catch (error) {
        console.error('Error fetching analysis:', error);
        return json({ error: 'Failed to fetch analysis' }, { status: 500 });
    }
}