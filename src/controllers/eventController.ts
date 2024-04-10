const Event = require('../models/eventModel');
import { Request, Response } from 'express';

async function getEvents (req : Request, res : Response){
  try {
    const events = await Event.Event.find();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

async function createEvent (req : Request, res : Response){
  const event = new Event.Event({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export = { getEvents, createEvent }