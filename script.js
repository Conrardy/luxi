document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Simulation analytiques 
            console.log(`Navigation vers: ${this.textContent}`);
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filters active state
    const filters = document.querySelectorAll('.filter');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Simulation de filtrage (à implémenter avec de vraies données)
            const filterType = this.textContent;
            console.log(`Filtrage par: ${filterType}`);
        });
    });
    
    // Ajouter des fonctionnalités interactives pour la démonstration
    const skillDots = document.querySelectorAll('.skill-dot');
    skillDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const isFilled = this.classList.contains('filled');
            const dotRow = this.closest('.skill-indicator');
            const allDots = dotRow.querySelectorAll('.skill-dot');
            const dotIndex = Array.from(allDots).indexOf(this);
            const levelCounter = this.closest('.skill-level').querySelector('span');
            
            // Mettre à jour les points de compétence
            allDots.forEach((d, i) => {
                if (i <= dotIndex) {
                    d.classList.add('filled');
                } else {
                    d.classList.remove('filled');
                }
            });
            
            // Mettre à jour le compteur
            levelCounter.textContent = dotIndex + 1;
        });
    });
    
    // Ajouter la fonctionnalité pour créer un nouveau parcours
    const addPathwayBtn = document.getElementById('add-pathway-btn');
    if (addPathwayBtn) {
        addPathwayBtn.addEventListener('click', function() {
            // Créer une modale simple pour la démo
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-header">
                    <h3>Créer un nouveau parcours</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="employee">Collaborateur</label>
                        <select id="employee" class="form-control">
                            <option>Sélectionner un collaborateur</option>
                            <option>Julien Martin</option>
                            <option>Sophie Bernard</option>
                            <option>Lucas Dubois</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pathway-type">Type de parcours</label>
                        <select id="pathway-type" class="form-control">
                            <option>Sélectionner un type</option>
                            <option>ReSkill</option>
                            <option>UpSkill</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="target-position">Poste cible</label>
                        <input type="text" id="target-position" class="form-control" placeholder="Poste visé">
                    </div>
                    <div class="form-group">
                        <label>Compétences à développer</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox"> JavaScript</label>
                            <label><input type="checkbox"> HTML/CSS</label>
                            <label><input type="checkbox"> React</label>
                            <label><input type="checkbox"> Node.js</label>
                            <label><input type="checkbox"> Communication</label>
                            <label><input type="checkbox"> Gestion de projet</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline">Annuler</button>
                    <button class="btn">Créer</button>
                </div>
            `;
            
            modalOverlay.appendChild(modal);
            document.body.appendChild(modalOverlay);
            
            // Gérer la fermeture
            const closeBtn = modal.querySelector('.close-btn');
            const cancelBtn = modal.querySelector('.btn-outline');
            
            const closeModal = () => {
                document.body.removeChild(modalOverlay);
            };
            
            closeBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        });
    }
    
    // Ajouter la fonctionnalité pour ajouter un collaborateur
    const addCollaboratorBtn = document.getElementById('add-collaborator-btn');
    if (addCollaboratorBtn) {
        addCollaboratorBtn.addEventListener('click', function() {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-header">
                    <h3>Ajouter un collaborateur</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="collaborator-name">Nom</label>
                        <input type="text" id="collaborator-name" class="form-control" placeholder="Nom complet">
                    </div>
                    <div class="form-group">
                        <label for="collaborator-role">Rôle</label>
                        <input type="text" id="collaborator-role" class="form-control" placeholder="Rôle">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline">Annuler</button>
                    <button id="save-collaborator-btn" class="btn">Ajouter</button>
                </div>
            `;

            modalOverlay.appendChild(modal);
            document.body.appendChild(modalOverlay);

            const closeModal = () => document.body.removeChild(modalOverlay);

            modal.querySelector('.close-btn').addEventListener('click', closeModal);
            modal.querySelector('.btn-outline').addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });

            modal.querySelector('#save-collaborator-btn').addEventListener('click', function() {
                const name = document.getElementById('collaborator-name').value.trim();
                const role = document.getElementById('collaborator-role').value.trim();
                if (name && role) {
                    const teamList = document.querySelector('.team-list');
                    const newMember = document.createElement('div');
                    newMember.className = 'team-member';
                    newMember.innerHTML = `
                        <div class="employee-profile">
                            <div class="profile-avatar">${name.split(' ').map(n => n[0]).join('')}</div>
                            <div>
                                <div>${name}</div>
                                <small>${role}</small>
                            </div>
                        </div>
                    `;
                    teamList.appendChild(newMember);
                    closeModal();
                } else {
                    alert('Veuillez remplir tous les champs.');
                }
            });
        });
    }
    
    // Ajouter un écouteur pour la recherche
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log(`Recherche: ${searchTerm}`);
                alert(`Recherche en cours pour: "${searchTerm}"`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
});
