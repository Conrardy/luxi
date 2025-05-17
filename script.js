// Simulated roles and users
const roles = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  COLLABORATOR: "Collaborateur",
};

const users = [
  { id: 1, name: "Alice", role: roles.ADMIN },
  { id: 2, name: "Bob", role: roles.MANAGER },
  { id: 3, name: "Charlie", role: roles.COLLABORATOR },
];

// Simulate current logged-in user
let currentUser = users[0]; // Default to the first user (Admin)

// Function to update UI based on role
function updateUIBasedOnRole() {
  const adminElements = document.querySelectorAll(".admin-only");
  const managerElements = document.querySelectorAll(".manager-only");
  const collaboratorElements = document.querySelectorAll(".collaborator-only");

  // Hide all role-specific elements by default
  adminElements.forEach((el) => (el.style.display = "none"));
  managerElements.forEach((el) => (el.style.display = "none"));
  collaboratorElements.forEach((el) => (el.style.display = "none"));

  // Show elements based on the current user's role
  if (currentUser.role === roles.ADMIN) {
    adminElements.forEach((el) => (el.style.display = "block"));
  } else if (currentUser.role === roles.MANAGER) {
    managerElements.forEach((el) => (el.style.display = "block"));
  } else if (currentUser.role === roles.COLLABORATOR) {
    collaboratorElements.forEach((el) => (el.style.display = "block"));
  }
}

// Function to switch user (for simulation purposes)
function switchUser(userId) {
  currentUser = users.find((user) => user.id === userId);
  updateUIBasedOnRole();
}

document.addEventListener("DOMContentLoaded", function () {
  updateUIBasedOnRole();

  // Example: Add event listeners for user switching (if needed)
  document.querySelectorAll(".user-switch").forEach((button) => {
    button.addEventListener("click", () => {
      const userId = parseInt(button.dataset.userId, 10);
      switchUser(userId);
    });
  });

  // Navigation active state
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").includes(".html")) {
        return; // Ne pas empêcher le comportement par défaut
      }

      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Simulation analytiques
      console.log(`Navigation vers: ${this.textContent}`);

      // Scroll to section
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Filters active state
  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    filter.addEventListener("click", function () {
      filters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      // Simulation de filtrage (à implémenter avec de vraies données)
      const filterType = this.textContent;
      console.log(`Filtrage par: ${filterType}`);
    });
  });

  if (window.location.pathname.includes("luxi_prototype.html")) {
    // Ajout du script pour exporter la matrice en Excel
    document
      .getElementById("export-excel-btn")
      .addEventListener("click", function () {
        const table = document.querySelector(".table-container table");
        const rows = Array.from(table.rows);
        let csvContent = "";

        rows.forEach((row) => {
          const cells = Array.from(row.cells);
          const rowContent = cells
            .map((cell) => `"${cell.innerText}"`)
            .join(",");
          csvContent += rowContent + "\n";
        });

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "matrice_competences.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  // Ajouter des fonctionnalités interactives pour la démonstration
  const skillDots = document.querySelectorAll(".skill-dot");
  skillDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const isFilled = this.classList.contains("filled");
      const dotRow = this.closest(".skill-indicator");
      const allDots = dotRow.querySelectorAll(".skill-dot");
      const dotIndex = Array.from(allDots).indexOf(this);
      const levelCounter = this.closest(".skill-level").querySelector("span");

      // Mettre à jour les points de compétence
      allDots.forEach((d, i) => {
        if (i <= dotIndex) {
          d.classList.add("filled");
        } else {
          d.classList.remove("filled");
        }
      });

      // Mettre à jour le compteur
      levelCounter.textContent = dotIndex + 1;
    });
  });

  // Ajouter la fonctionnalité pour créer un nouveau parcours
  const addPathwayBtn = document.getElementById("add-pathway-btn");
  if (addPathwayBtn) {
    addPathwayBtn.addEventListener("click", function () {
      // Créer une modale simple pour la démo
      const modalOverlay = document.createElement("div");
      modalOverlay.className = "modal-overlay";

      const modal = document.createElement("div");
      modal.className = "modal";
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
      const closeBtn = modal.querySelector(".close-btn");
      const cancelBtn = modal.querySelector(".btn-outline");

      const closeModal = () => {
        document.body.removeChild(modalOverlay);
      };

      closeBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);
      modalOverlay.addEventListener("click", function (e) {
        if (e.target === modalOverlay) {
          closeModal();
        }
      });
    });
  }

  // Ajouter la fonctionnalité pour ajouter un collaborateur
  const addCollaboratorBtn = document.getElementById("add-collaborator-btn");
  if (addCollaboratorBtn) {
    addCollaboratorBtn.addEventListener("click", function () {
      const modalOverlay = document.createElement("div");
      modalOverlay.className = "modal-overlay";

      const modal = document.createElement("div");
      modal.className = "modal";
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

      modal.querySelector(".close-btn").addEventListener("click", closeModal);
      modal.querySelector(".btn-outline").addEventListener("click", closeModal);
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
      });

      modal
        .querySelector("#save-collaborator-btn")
        .addEventListener("click", function () {
          const name = document
            .getElementById("collaborator-name")
            .value.trim();
          const role = document
            .getElementById("collaborator-role")
            .value.trim();
          if (name && role) {
            const teamList = document.querySelector(".team-list");
            const newMember = document.createElement("div");
            newMember.className = "team-member";
            newMember.innerHTML = `
                        <div class="employee-profile">
                            <div class="profile-avatar">${name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}</div>
                            <div>
                                <div>${name}</div>
                                <small>${role}</small>
                            </div>
                        </div>
                    `;
            teamList.appendChild(newMember);
            closeModal();
          } else {
            alert("Veuillez remplir tous les champs.");
          }
        });
    });
  }

  // Ajouter un écouteur pour la recherche
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".search-input");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        console.log(`Recherche: ${searchTerm}`);
        alert(`Recherche en cours pour: "${searchTerm}"`);
      }
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  }

  // Ajouter une compétence
  const addSkillBtn = document.getElementById("add-skill-btn");
  if (addSkillBtn) {
    addSkillBtn.addEventListener("click", function () {
      const modalOverlay = document.createElement("div");
      modalOverlay.className = "modal-overlay";

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-header">
                    <h3>Ajouter une compétence</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="skill-name">Nom de la compétence</label>
                        <input type="text" id="skill-name" class="form-control" placeholder="Nom de la compétence">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline">Annuler</button>
                    <button id="save-skill-btn" class="btn">Ajouter</button>
                </div>
            `;

      modalOverlay.appendChild(modal);
      document.body.appendChild(modalOverlay);

      const closeModal = () => document.body.removeChild(modalOverlay);

      modal.querySelector(".close-btn").addEventListener("click", closeModal);
      modal.querySelector(".btn-outline").addEventListener("click", closeModal);
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
      });

      modal
        .querySelector("#save-skill-btn")
        .addEventListener("click", function () {
          const skillName = document.getElementById("skill-name").value.trim();
          if (skillName) {
            const tableHead = document.querySelector(
              ".skill-matrix table thead tr"
            );
            const tableRows = document.querySelectorAll(
              ".skill-matrix table tbody tr"
            );

            // Ajouter une nouvelle colonne dans l'en-tête
            const newHeader = document.createElement("th");
            newHeader.textContent = skillName;
            tableHead.appendChild(newHeader);

            // Ajouter une cellule vide pour chaque ligne
            tableRows.forEach((row) => {
              const newCell = document.createElement("td");
              newCell.innerHTML = `
                            <div class="skill-level">
                                <div class="skill-indicator">
                                    <div class="skill-dot"></div>
                                    <div class="skill-dot"></div>
                                    <div class="skill-dot"></div>
                                    <div class="skill-dot"></div>
                                </div>
                                <span>0</span>
                            </div>
                        `;
              row.appendChild(newCell);
            });

            closeModal();
          } else {
            alert("Veuillez entrer un nom de compétence.");
          }
        });
    });
  }

  // Modifier la matrice de compétences
  const editMatrixBtn = document.getElementById("edit-matrix-btn");
  if (editMatrixBtn) {
    editMatrixBtn.addEventListener("click", function () {
      alert("Fonctionnalité de modification de la matrice à implémenter.");
    });
  }

  // Ajouter une ligne pour un nouveau collaborateur
  const addCollabBtn = document.getElementById("add-collaborator-row-btn");
  if (addCollabBtn) {
    document
      .getElementById("add-collaborator-row-btn")
      .addEventListener("click", function () {
        const tableBody = document.querySelector(".skill-matrix table tbody");
        const newRow = document.createElement("tr");

        // Exemple de données pour un nouveau collaborateur
        const collaboratorName = "Nouveau Collaborateur";
        const collaboratorRole = "Rôle";

        // Ajouter la cellule pour le collaborateur
        const collaboratorCell = document.createElement("td");
        collaboratorCell.innerHTML = `
        <div class="employee-profile">
            <div class="profile-avatar">NC</div>
            <div>
                <div>${collaboratorName}</div>
                <small>${collaboratorRole}</small>
            </div>
        </div>
    `;
        newRow.appendChild(collaboratorCell);

        // Ajouter des cellules vides pour chaque compétence existante
        const skillColumns =
          document.querySelectorAll(".skill-matrix table thead th").length - 1; // Exclure la colonne Collaborateur
        for (let i = 0; i < skillColumns; i++) {
          const skillCell = document.createElement("td");
          skillCell.innerHTML = `
            <div class="skill-level">
                <div class="skill-indicator">
                    <div class="skill-dot"></div>
                    <div class="skill-dot"></div>
                    <div class="skill-dot"></div>
                    <div class="skill-dot"></div>
                </div>
                <span>0</span>
            </div>
        `;
          newRow.appendChild(skillCell);
        }

        tableBody.appendChild(newRow);
      });
  }
  // Simuler des données pour les analytics
  if (window.location.pathname.includes("analytics.html")) {
    const topSkills = [
      "JavaScript",
      "HTML/CSS",
      "React",
      "Node.js",
      "Python",
      "SQL",
      "Java",
      "C#",
      "PHP",
      "TypeScript",
    ];
    const scarceSkills = [
      "Machine Learning",
      "Data Science",
      "DevOps",
      "Cybersecurity",
      "Cloud Computing",
    ];
    const upskillReskillData = { upskill: 5, reskill: 3 };

    // Ajouter les compétences maîtrisées
    const topSkillsList = document.getElementById("top-skills");
    topSkills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      topSkillsList.appendChild(li);
    });

    // Ajouter les compétences pénuriques
    const scarceSkillsList = document.getElementById("scarce-skills");
    scarceSkills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      scarceSkillsList.appendChild(li);
    });

    // Ajouter les données d'Upskill et Reskill
    const upskillReskillCount = document.getElementById(
      "upskill-reskill-count"
    );
    upskillReskillCount.textContent = `Upskill: ${upskillReskillData.upskill}, Reskill: ${upskillReskillData.reskill}`;
  }
  // Add interactivity for AI chat page
  if (window.location.pathname.includes("ai_interaction.html")) {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        const userBubble = document.createElement("div");
        userBubble.className = "chat-bubble user";
        userBubble.textContent = userMessage;
        chatMessages.appendChild(userBubble);

        const aiBubble = document.createElement("div");
        aiBubble.className = "chat-bubble ai";
        aiBubble.textContent =
          "Merci pour votre question. Voici une suggestion pour votre parcours.";
        chatMessages.appendChild(aiBubble);

        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  }

  // Add interactivity for role switcher
  const roleSwitcher = document.getElementById("role-select");
  if (roleSwitcher) {
    const adminSection = document.querySelector(".admin-only");
    const managerSection = document.querySelector(".manager-only");
    const collaboratorSection = document.querySelector(".collaborator-only");

    function updateRoleView() {
      const selectedRole = roleSwitcher.value;

      // Hide all sections by default
      adminSection.style.display = "none";
      managerSection.style.display = "none";
      collaboratorSection.style.display = "none";

      // Show the section corresponding to the selected role
      if (selectedRole === "Admin") {
        adminSection.style.display = "block";
      } else if (selectedRole === "Manager") {
        managerSection.style.display = "block";
      } else if (selectedRole === "Collaborateur") {
        collaboratorSection.style.display = "block";
      }
    }

    // Add event listener to the role switcher dropdown
    roleSwitcher.addEventListener("change", updateRoleView);

    // Initialize the view based on the default selected role
    updateRoleView();
  }

  // Add interactivity for the Mistral interview simulation page
  if (window.location.pathname.includes("mistral_chat.html")) {
    const startInterviewBtn = document.getElementById("start-interview-btn");
    const newConversationBtn = document.getElementById("new-conversation-btn");
    const candidateContext = document.getElementById("candidate-context");
    const managerContext = document.getElementById("manager-context");
    const chatMessages = document.getElementById("chat-messages");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const conversationHistoryInput = document.getElementById(
      "conversation-history"
    );

    let conversationHistory = [];

    const mistralAgenId = "ag:a1ce995b:20250430:untitled-agent:081d9a57";
    const mistralApiKey = "orytVKaVGpcmLne9wiNNmbnPSgGmOrx3";
    async function sendToMistral(messages) {
      try {
        const response = await fetch(
          "https://api.mistral.ai/v1/agents/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mistralApiKey}`,
            },
            body: JSON.stringify({
              agent_id: mistralAgenId,
              messages: messages,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error("Error communicating with Mistral API:", error);
        return "Une erreur s'est produite lors de la communication avec l'API Mistral.";
      }
    }

    function resetConversation() {
      conversationHistory = [];
      conversationHistoryInput.value = JSON.stringify(conversationHistory);
      chatMessages.innerHTML = "";
      candidateContext.value = "";
      managerContext.value = "";
      chatInput.value = "";
    }

    newConversationBtn.addEventListener("click", () => {
      resetConversation();
    });

    startInterviewBtn.addEventListener("click", async () => {
      const candidateText = candidateContext.value.trim();
      const managerText = managerContext.value.trim();

      if (!candidateText || !managerText) {
        alert(
          "Veuillez remplir les deux contextes avant de commencer l'entretien."
        );
        return;
      }

      // Add initial context as system message
      conversationHistory = [
        {
          role: "user",
          content: `Contexte Candidat/Employé: ${candidateText}\nContexte Manager/RH: ${managerText}`,
        },
      ];
      conversationHistoryInput.value = JSON.stringify(conversationHistory);

      const agentResponse = await sendToMistral(conversationHistory);

      const aiBubble = document.createElement("div");
      aiBubble.className = "chat-bubble ai";
      aiBubble.textContent = agentResponse;
      chatMessages.appendChild(aiBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Add AI response to conversation history
      conversationHistory.push({ role: "assistant", content: agentResponse });
      conversationHistoryInput.value = JSON.stringify(conversationHistory);
    });

    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;

      const userBubble = document.createElement("div");
      userBubble.className = "chat-bubble user";
      userBubble.textContent = userMessage;
      chatMessages.appendChild(userBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Add user message to conversation history
      conversationHistory.push({ role: "user", content: userMessage });
      conversationHistoryInput.value = JSON.stringify(conversationHistory);

      chatInput.value = "";

      // Send full conversation history for context
      const agentResponse = await sendToMistral(conversationHistory);

      const aiBubble = document.createElement("div");
      aiBubble.className = "chat-bubble ai";
      aiBubble.textContent = agentResponse;
      chatMessages.appendChild(aiBubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Add AI response to conversation history
      conversationHistory.push({ role: "assistant", content: agentResponse });
      conversationHistoryInput.value = JSON.stringify(conversationHistory);
    });
  }
});
