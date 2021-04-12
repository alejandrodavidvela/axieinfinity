const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const axiesEl = document.getElementById('axies');
const resultHeading = document.getElementById('result-heading');
const single_axieEl = document.getElementById('single-axie');
const get_age = document.getElementById('get-age');


function searchAxie(e){
    e.preventDefault();

    // Clear Single Chubby
    single_axieEl.innerHTML = '';

    // Get Search Term
    const term = search.value;

    
    
    //Check for Empty
    if(term < 0 ){
        alert('Please enter your Axie #');
        search.value = '';
    }else{
        if(term.trim()){
            fetch(`https://api.opensea.io/api/v1/assets/?asset_contract_address=0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d&token_ids=${term}`)
                .then(res => res.json())
                .then(data => {
                    
                    if(data.assets === null){
                        resultHeading.innerHTML = `<p>There are no search results. Try Again!</p>`;
    
                    }else{
                        
                        const year = data.assets;
                        const currentYear = year[0].asset_contract.created_date.slice(0,4)
                        

                        
                        function updateCountdown() {
                            const currentTime = new Date().getUTCFullYear()
                            
                            const diff = currentTime - currentYear;
                            
                            return diff
                        }    
                        const diff = updateCountdown()
                        
                        

                        axiesEl.innerHTML = data.assets.map(asset => `
                            <div class="axie">
                                <img class="axie-img" src="${asset.image_url}" alt="${asset.name}" />
                                <div class="axie-info" data-axieID="${asset.id}">
                                    <h3>${asset.name}</h3>
                                </div>
                                <div class="axie-owner">
                                    <h3>Owner:</h3>
                                    <a class="axie-address" href="https://etherscan.io/address/${asset.owner.address}">${asset.owner.address}</a>
                                </div>
                                <div class="axie-traits">
                                    <h3>Bid on NFT:</h3>
                                    <a class="axie-traits-link" href="https://opensea.io/assets/0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d/${term}">OpenSea</a>     
                                </div>
                                <div class="axie-namebase">
                                    <h3>Bid on .phb/</h3>
                                    <a class="axie-namebase-link" href="https://www.namebase.io/domains/phb">Namebase</a>     
                                </div>
                                
    
                            </div>
                        `).join('');
                    }
                    // Clear Search Text
                    search.value = '';
                });
        }else{
            alert('Please enter a Axie Number')
        }
    }
    
}



// Event Listener
submit.addEventListener('submit', searchAxie);
