        
        function toggleTheme() {
            const background = document.querySelector('.background');
            const themeSwitch = document.querySelector('.input'); 
            const header = document.querySelector('.header');  

            
            if (themeSwitch.checked) {
                background.style.backgroundImage = "url('bgokk-n.png')";
                
                
                const nightImage = document.createElement('img');
                nightImage.src = "265.png";
                nightImage.style.position = "absolute";
                nightImage.style.top = "12%";
                nightImage.style.left = "50%";
                nightImage.style.transform = "translateX(-50%)";
                nightImage.style.width = "300px";
                nightImage.style.zIndex = 1;
                nightImage.id = "flashing-image";
                background.appendChild(nightImage);

                
                let isFlashing = true;
                const flashInterval = setInterval(() => {
                    if (isFlashing) {
                        nightImage.src = "265-close.png"; 
                    } else {
                        nightImage.src = "265.png"; 
                    }
                    isFlashing = !isFlashing;
                }, 1500); 

                header.style.color = 'white';
            } else {
                
                background.style.backgroundImage = "url('bgokk.png')";
                
                
                const nightImage = document.querySelector("#flashing-image");
                if (nightImage) nightImage.remove(); 

                header.style.color = 'black';
            }
        }

        
        document.addEventListener("DOMContentLoaded", function() {
            if (document.querySelector('.input').checked) {
                toggleTheme(); 
            }
        });


        
        function makeDraggable(modalId) {
            const modal = document.getElementById(modalId);
            const modalContent = modal.querySelector('.modal-content');

            let offsetX = 0, offsetY = 0, isDragging = false;

            modalContent.onmousedown = (e) => {
                isDragging = true;
                offsetX = e.clientX - modal.offsetLeft;
                offsetY = e.clientY - modal.offsetTop;
            };

            document.onmousemove = (e) => {
                if (isDragging) {
                    modal.style.left = (e.clientX - offsetX) + 'px';
                    modal.style.top = (e.clientY - offsetY) + 'px';
                }
            };

            document.onmouseup = () => {
                isDragging = false;
            };
        }

        let evolvedPokemons = {
            treecko: false,
            torchic: false,
            mudkip: false
        };

        let currentStage = {
            treecko: 0,
            torchic: 0,
            mudkip: 0
        };

        let evolutionStages = {
            treecko: [
                { name: "Treecko", img: "252.webp", desc: "A small, green, chameleon-like Grass-type Pokémon with sharp claws. It's agile and often seen hanging from trees." },
                { name: "Grovyle", img: "253.webp", desc: "The evolved form of Treecko, it’s sleek, fast, and an expert at blending into forests." },
                { name: "Sceptile", img: "254.webp", desc: "The final evolution of Treecko, a large, agile Grass-type with a leaf blade tail and heightened speed and power." }
            ],
            torchic: [
                { name: "Torchic", img: "255.webp", desc: "A fiery, chick-like Fire-type Pokémon with a lot of potential for growth." },
                { name: "Combusken", img: "256.webp", desc: "The evolved form of Torchic, a fiery, bird-like fighter with a mix of Fire and Fighting traits." },
                { name: "Blaziken", img: "257.webp", desc: "The final evolution of Torchic, a powerful Fire/Fighting-type with incredible kicking abilities and speed." }
            ],
            mudkip: [
                { name: "Mudkip", img: "258.webp", desc: "A blue, Water-type tadpole Pokémon, known for its cuteness and strong swimming ability." },
                { name: "Marshtomp", img: "259.webp", desc: "The evolved form of Mudkip, it’s a tough, Water/Ground-type with better mobility on land and in water." },
                { name: "Swampert", img: "260.webp", desc: "The final evolution of Mudkip, a massive Water/Ground-type with high attack power and great tanking abilities." }
            ]
        };
        

        
        
        function evolve(pokemon) {
            evolvedPokemons[pokemon] = true;
            currentStage[pokemon]++;

            
            if (currentStage[pokemon] > 2) {
                currentStage[pokemon] = 0;
            }

            const evolution = evolutionStages[pokemon][currentStage[pokemon]];

            
            document.querySelector(`#${pokemon}-modal img`).src = evolution.img;
            document.querySelector(`#${pokemon}-modal h3`).textContent = evolution.name;
            document.querySelector(`#${pokemon}-modal p`).textContent = evolution.desc;
            
            updateHomepagePokemon(pokemon, evolution);
        }

        
        function updateHomepagePokemon(pokemon, evolution) {
            const pokemonCard = document.getElementById(pokemon + '-img');
            
            
            stopHomepageAnimation(pokemon);
            
            
            pokemonCard.src = evolution.img;
            
            
            pokemonCard.removeEventListener('click', pokemonClickHandler); 
            pokemonCard.addEventListener('click', () => {
                openEvolutionTab(pokemon);
            });
            
            
            if (!evolvedPokemons[pokemon]) {
                startHomepageAnimation(pokemon);
            }
        }
        
        function showModal(pokemon) {
        const modal = document.getElementById(pokemon + '-modal');
        modal.style.display = "flex"; 

        
        makeDraggable(pokemon + '-modal');
        }
        
        
        function closeModal(pokemon) {
            const modal = document.getElementById(pokemon + '-modal');
            modal.style.display = 'none'; 

            
            if (!evolvedPokemons[pokemon]) {
                startHomepageAnimation(pokemon);
            }
        }

        
        function startHomepageAnimation(pokemon) {
            const pokemonImg = document.getElementById(pokemon + '-img');

            if (!pokemonImg.dataset.animating) {
                pokemonImg.dataset.animating = "true"; 

                pokemonImg.animationInterval = setInterval(() => {
                    if (pokemonImg.dataset.animating === "true" && !evolvedPokemons[pokemon]) {
                        const evolution = evolutionStages[pokemon][currentStage[pokemon]];
                        pokemonImg.src = evolution.img.replace('.webp', '-close.png');
                        setTimeout(() => pokemonImg.src = evolution.img, 300);
                    }
                }, 2500); 
            }
        }

        
        function stopHomepageAnimation(pokemon) {
            const pokemonImg = document.getElementById(pokemon + '-img');
            if (pokemonImg.animationInterval) {
                clearInterval(pokemonImg.animationInterval);
                pokemonImg.dataset.animating = "false"; 
            }
        }

        
        function openEvolutionTab(pokemon) {
            console.log(`Opening evolution tab for ${pokemon}`);
            
        }

        
        function pokemonClickHandler(event) {
            const pokemon = event.target.id.split('-')[0]; 
            openEvolutionTab(pokemon);
        }

        
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelectorAll('.pokemon-card').forEach(card => {
                card.addEventListener('click', function() {
                    const pokemonId = this.id.replace('-card', ''); 
                    showModal(pokemonId);
                });
            });
        });

