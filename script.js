'use strict';

(function () {
  // Helper selectors
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return (ctx || document).querySelectorAll(sel); };

  // Mobile nav toggle
  var navToggle = $('#nav-toggle');
  var navLinks = $('#nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click (mobile)
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle
  var themeToggle = $('#theme-toggle');
  var updateThemeLabel = function (theme) {
    var label = $('.theme-toggle-label');
    if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  };
  var setTheme = function (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
    updateThemeLabel(theme);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
    // Initialize label
    updateThemeLabel(document.documentElement.getAttribute('data-theme') || 'light');
  }

  // Smooth scroll for on-page links
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        history.replaceState(null, '', '#' + targetId);
      }
    });
  });

  // Contact form validation + fake submit
  var form = $('#contact-form');
  if (form) {
    var status = $('#form-status');
    var fields = ['name', 'email', 'org', 'message', 'agree'];

    var setError = function (name, message) {
      var errorEl = $('.error[data-error-for="' + name + '"]');
      if (errorEl) errorEl.textContent = message || '';
    };

    var validate = function () {
      var valid = true;
      fields.forEach(function (name) { setError(name, ''); });
      var nameEl = $('#name');
      var emailEl = $('#email');
      var orgEl = $('#org');
      var msgEl = $('#message');
      var agreeEl = $('#agree');

      if (!nameEl.value.trim()) { setError('name', 'Please enter your name'); valid = false; }
      if (!orgEl.value.trim()) { setError('org', 'Please enter your organization'); valid = false; }
      if (!msgEl.value.trim()) { setError('message', 'Please tell us a bit about your needs'); valid = false; }

      var email = emailEl.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) { setError('email', 'Enter a valid work email'); valid = false; }

      if (!agreeEl.checked) { setError('agree', 'You must accept the privacy policy'); valid = false; }
      return valid;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;

      if (status) {
        status.hidden = false;
        status.textContent = 'Sending…';
      }

      // Simulate async submit
      setTimeout(function () {
        if (status) status.textContent = 'Thanks! We\'ll be in touch shortly.';
        form.reset();
      }, 900);
    });
  }

  // Footer year
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();