import HttpStatus from "http-status-codes";

import * as taskService from "../services/tasks";

export async function getAll(req, res, next) {
  try {
    const data = await taskService.getAll(req.query);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const data = await taskService.getById(req.params.id);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const data = await taskService.create(req.body);

    res.status(HttpStatus.CREATED).send(data);
  } catch (err) {
    next(err);
  }
}

export async function updateById(req, res, next) {
  try {
    const { status, ...rest } = req.body;

    const data = await taskService.updateById(req.params.id, rest, status);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteById(req, res, next) {
  try {
    const data = await taskService.deleteById(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send(data);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const data = await taskService.updateStatus(req.params.id, req.body.status);

    res.send(data);
  } catch (err) {
    next(err);
  }
}
