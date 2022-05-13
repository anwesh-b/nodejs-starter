import * as taskService from "../services/tasks";

export async function getAll(req, res) {
  const data = await taskService.getAll(req.query);

  res.send(data);
}

export async function getById(req, res) {
  const data = await taskService.getById(req.params.id);

  res.send(data);
}

export async function create(req, res) {
  const data = await taskService.create(req.body);

  res.send(data);
}

export async function updateById(req, res) {
  const { status, ...rest } = req.body;

  const data = await taskService.updateById(req.params.id, rest, status);

  res.send(data);
}

export async function deleteById(req, res) {
  const data = await taskService.deleteById(req.params.id);

  res.send(data);
}

export async function updateStatus(req, res) {
  const data = await taskService.updateStatus(req.params.id, req.body.status);

  res.send(data);
}
