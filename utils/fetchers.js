import client from './client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { email } from './constanst';

const getActivity = async () => {
  const res = await client.get('/activity-groups', {
    params: {
      email: email,
    },
  });
  return res.data.data;
};

const createActivity = async (params) => {
  const res = await client.post('/activity-groups', params);
  return res.data.data;
};

const deleteActivity = async (id) => {
  const res = await client.delete(`/activity-groups/${id}`);
  return res.data.data;
};

const getDetailActivity = async (id) => {
  const res = await client.get(`/activity-groups/${id}`);
  return res.data;
};

const updateActivity = async (params) => {
  const res = await client.patch(`/activity-groups/${params.id}`, params);
  return res.data;
};

const createTodo = async (params) => {
  const res = await client.post(`/todo-items`, params);
  return res.data;
};

const updateTodo = async (params) => {
  const res = await client.patch(`/todo-items/${params.id}`, params, {
    params: null,
  });
  return res.data;
};

const deleteTodo = async (id) => {
  const res = await client.delete(`/todo-items/${id}`, {
    params: null,
  });
  return res.data;
};

const useGetActivity = (extraparams) => {
  return useQuery([], getActivity, { ...extraparams });
};

const useCreateActivity = (extraparams) =>
  useMutation((params) => createActivity(params), { ...extraparams });

const useDeleteActivity = (extraparams) =>
  useMutation((id) => deleteActivity(id), { ...extraparams });

const useGetDetailActivity = (id, extraparams) => {
  return useQuery(['detail-activity'], () => getDetailActivity(id), {
    enabled: !!id,
    ...extraparams,
  });
};

const useUpdateActivity = (extraparams) =>
  useMutation((params) => updateActivity(params), { ...extraparams });

const useCreateTodo = (extraparams) =>
  useMutation((params) => createTodo(params), { ...extraparams });

const useUpdateTodo = (extraparams) =>
  useMutation((params) => updateTodo(params), { ...extraparams });

const useDeleteTodo = (extraparams) =>
  useMutation((id) => deleteTodo(id), { ...extraparams });

export {
  useGetActivity,
  useCreateActivity,
  useDeleteActivity,
  useGetDetailActivity,
  useUpdateActivity,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
};
