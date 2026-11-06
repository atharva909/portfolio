"use strict";

// Shop, Employment, GrowMind: sourced from AtharvResume-1.pdf (Projects section).
// Matrimony: based on previously supplied details, not included in the resume.
const projects = {
  matrimony: {
    number: '01',
    title: 'Matrimony',
    description: 'A matchmaking web application with member profiles, verification, partner preferences, and moderator-facing workflows. Project details were supplied separately from my resume.',
    features: [
      'Member profiles and partner preference workflows',
      'Member verification and moderator functionality',
      'Database-backed web application features'
    ],
    tags: ['C#', 'ASP.NET MVC', 'SQL Server', 'AJAX']
  },
  shop: {
    number: '02',
    title: 'Shop Management System',
    description: 'A Windows Forms desktop application for shop inventory, sales, billing, and customer records.',
    features: [
      'Inventory tracking, product management, and stock alerts',
      'Billing and invoice generation with totals, discounts, and taxes',
      'Windows Forms interface for order processing and daily sales reports',
      'SQL Server storage for products, customers, and transaction history'
    ],
    tags: ['C#', 'Windows Forms', 'ADO.NET', 'SQL Server']
  },
  employment: {
    number: '03',
    title: 'Employment Management System',
    description: 'A web application for recruitment, employee records, attendance, payroll, and performance tracking.',
    features: [
      'Employee records, departments, and designations',
      'Attendance tracking and automated payroll/salary calculation',
      'Role-based access for Admin, HR, and Employee',
      'ASP.NET Web Forms backend with SQL Server data connectivity'
    ],
    tags: ['C#', 'ASP.NET Web Forms', 'ADO.NET', 'SQL Server', 'HTML5', 'CSS3', 'JavaScript']
  },
  learning: {
    number: '04',
    title: 'GrowMind — Learning Management System',
    description: 'An end-to-end web-based learning management platform for administrators, trainers, and learners.',
    features: [
      'Course management, payments, reports, and certificates',
      'Role-based access for Admin, Trainer, and Learner with progress tracking',
      'Trainer commission and coupon modules for pricing and promotions',
      'Analytics dashboards for learner engagement, courses, payments, and trainer earnings'
    ],
    tags: ['C#', 'ASP.NET MVC', 'Razor', 'ADO.NET', 'SQL Server', 'JavaScript', 'HTML5', 'CSS3']
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogNumber = document.querySelector('#dialog-number');
const dialogDescription = document.querySelector('#dialog-desc');
const dialogFeatures = document.querySelector('#dialog-features');
const dialogTags = document.querySelector('#dialog-tags');
let lastProjectTrigger = null;

function closeProject() {
  if (dialog.open) dialog.close();
  if (lastProjectTrigger) lastProjectTrigger.focus();
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    lastProjectTrigger = button;
    dialogTitle.textContent = project.title;
    dialogNumber.textContent = project.number;
    dialogDescription.textContent = project.description;
    dialogFeatures.replaceChildren();
    project.features.forEach(feature => {
      const item = document.createElement('li');
      item.textContent = feature;
      dialogFeatures.appendChild(item);
    });
    dialogTags.replaceChildren();
    project.tags.forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      dialogTags.appendChild(span);
    });
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', closeProject);
document.querySelector('.dialog-back').addEventListener('click', closeProject);
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    navigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});
