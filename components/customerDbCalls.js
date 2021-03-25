
export const retrieveRestaurantInfo = (restaurantUrl, restaurantId) => {

        const retrieveRestaurantInfoAsync = async () => {
            try{
                let response = await fetch(
                   restaurantUrl + `lookup/${restaurantId}`, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                let json = await response.json();
                
                    if(json.menus&&json.menus.length>0){
                        json.menus = json.menus.map((item, index) =>{
                        item.menuItems = item.menuItems.map((menuItem, indice)=>{
                            return {...menuItem, "id" : indice}
                        })
                        return {...item, "id":index}
                    } );
                    }

                console.log(JSON.stringify(json));

                return json;
            } catch (e) {
                console.error(e);
            }

    }

    return retrieveRestaurantInfoAsync();

}


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