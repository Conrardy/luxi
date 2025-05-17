Je souhaite créer une page pour un agent de simulation d'entretien d'embauche.

exemple de client javascript :
```javascript
import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

const chatResponse = await client.agents.complete({
  agentId: "ag:a1ce995b:20250430:untitled-agent:081d9a57",
  messages: [{role: 'user', content: 'commence l'entretien d'embauche'}],
});

console.log('Chat:', chatResponse.choices[0].message.content);
```

voici la clé api mistral d'un agent mistral à utiliser : ag:a1ce995b:20250430:untitled-agent:081d9a57

La page contient deux entrées de texte de 500 caractères chacune :
- une pour le contexte du candidat
- une pour le contexte du manager qui fait passer l'entretien


La page contient une UI de chat pour voir les réponse de l'agent.
ajoute un bouton "commencer l'entretien" qui envoie le contexte du candidat et du manager 

sous le format suivant :
```json
Contexte Candidat/Employé: 
<input value contexte candidat>

Contexte Manager/RH: 
<input value contexte manager>
```

Crée une nouvelle page.
