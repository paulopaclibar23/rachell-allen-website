/**
 * AJAX Request Helper Module
 */
window.Ajax = {
    /**
     * Submit an asynchronous GET request.
     */
    async get(url) {
        try {
            const response = await fetch(url, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ajax GET request failed:', error);
            throw error;
        }
    },

    /**
     * Submit an asynchronous POST request with JSON payload or FormData.
     */
    async post(url, data, csrfToken = null) {
        try {
            const headers = {
                'X-Requested-With': 'XMLHttpRequest'
            };

            let body;
            if (data instanceof FormData) {
                body = data;
                if (csrfToken) {
                    body.append('csrf_token', csrfToken);
                }
            } else {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify({
                    ...data,
                    csrf_token: csrfToken
                });
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ajax POST request failed:', error);
            throw error;
        }
    }
};
