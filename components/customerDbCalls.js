


export const retrieveOpenRestaurants = (url) => {

    const retrieveOpenRestaurantsAsync = async () => {
                    try{
                let response = await fetch(
                   url, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                let json = await response.json();
                return json;
                //do something with this

            } catch (e) {
                console.error(e);
                return null;
            }
    }
    return retrieveOpenRestaurantsAsync();
}