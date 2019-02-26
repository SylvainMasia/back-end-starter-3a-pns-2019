const { Router } = require('express');
const { Ticket } = require('../../models');
const { Student } = require('../../models');


function attachStudent(ticket) {
  const newTicket = Object.assign({}, ticket, { student: Student.getById(ticket.studentId) });
  return newTicket;
}

const router = new Router();

router.get('/', (req, res) => {
  const tickets = Ticket.get().map(attachStudent);
  res.status(200).json(tickets);
});
router.get('/:ticketId', (req, res) => res.status(200).json(attachStudent(Ticket.getById(req.params.ticketId))));
router.delete('/:ticketId', (req, res) => res.status(200).json(Ticket.delete(req.params.ticketId)));
router.put('/:ticketId', (req, res) => {
  console.log(req.params, req.body);
  res.status(200).json(Ticket.update(req.params.ticketId, req.body));
});
router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    const newTicket = attachStudent(ticket);
    res.status(201).json(newTicket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;