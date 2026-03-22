const express = require('express');
const router = express.Router();

// ---------------------
// ROUTES PAGES EJS
// ---------------------

// Dashboard (page EJS)
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { pageTitle: 'Dashboard' });
});

// Utilisateurs (page EJS)
router.get('/users-ejs', (req, res) => {
    res.render('users', { pageTitle: 'Utilisateurs' });
});

// Catways (page EJS)
router.get('/catways-ejs', (req, res) => {
    res.render('catways', { pageTitle: 'Catways' });
});

// Réservations (page EJS)
router.get('/reservations-ejs', (req, res) => {
    res.render('reservations', { pageTitle: 'Réservations' });
});

// Documentation API (page EJS)
router.get('/api-doc-ejs', (req, res) => {
    res.render('api-doc', { pageTitle: 'Documentation API' });
});

// Déconnexion (page EJS)
router.get('/logout-ejs', (req, res) => {
    res.redirect('/login'); // redirige vers la page login
});

module.exports = router;