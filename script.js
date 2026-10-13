// Liste des plats typiques de Guinée Conakry
const menu = [
    {
        id: 1,
        nom: "Riz Gras à la Viande / Poisson",
        description: "Riz mijoté dans une sauce tomate assaisonnée aux légumes et épices locales.",
        prix: 35000
    },
    {
        id: 2,
        nom: "Sauce Feuille (Kansiye / Konkoé)",
        description: "Sauce à base de feuilles de patate ou de manioc aromatisée au poisson fumé.",
        prix: 40000
    },
    {
        id: 3,
        nom: "Sauce Arachide (Maffi Tiga)",
        description: "Sauce onctueuse à la pâte d'arachide servie avec du riz blanc chaud.",
        prix: 35000
    },
    {
        id: 4,
        nom: "Poisson Frit & Alloco",
        description: "Poisson frais frit accompagné de bananes plantains frites bien dorées.",
        prix: 45000
    },
    {
        id: 5,
        nom: "Jus de Bissap Glacé",
        description: "Boisson rafraîchissante aux fleurs d'hibiscus et feuilles de menthe.",
        prix: 10000
    },
    {
        id: 6,
        nom: "Jus de Gingembre (Gnamakoudji)",
        description: "Jus d'épice piquante au gingembre et ananas très dynamisant.",
        prix: 10000
    }
];

let cart = [];
let total = 0;

// Affichage du menu sur la page
const menuGrid = document.getElementById('menuGrid');

menu.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div>
            <h3>${item.nom}</h3>
            <p>${item.description}</p>
            <p class="price">${item.prix.toLocaleString()} GNF</p>
        </div>
        <button onclick="addToCart('${item.nom}', ${item.prix})">Commander</button>
    `;
    menuGrid.appendChild(card);
});

// Fonction pour ajouter au panier
function addToCart(itemName, itemPrice) {
    cart.push({ nom: itemName, prix: itemPrice });
    total += itemPrice;
    updateCartUI();
}

// Mettre à jour la section de commande
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Aucun article sélectionné</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nom} - ${item.prix.toLocaleString()} GNF`;
            cartItems.appendChild(li);
        });
    }

    totalPrice.textContent = total.toLocaleString();
}
function sendOrderWhatsApp() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;

    if (!name || !phone) {
        alert("Veuillez renseigner votre nom et votre numéro de téléphone.");
        return;
    }

    // Votre numéro WhatsApp au format international (ex: 224600000000)
    const myPhoneNumber = "224610132773"; 

    // Préparation du message
    let message = "Bonjour DMSK, je souhaite passer une commande :\n\n";
    message += "- Client :" + name +"\n";
    message += "- Téléphone :"+ phone +"\n\n";
    message += "- Commande :\n";

    cart.forEach(item => {
        message += " *" + item.nom +" (" + item.prix.toLocaleString() + "GNF)\n";
    });

    message += "\nTotal :" + total.toLocaleString()+" GNF";

    // Ouverture de WhatsApp avec le message pré-rempli
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}