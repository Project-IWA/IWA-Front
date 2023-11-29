import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const notificationsAdapter = createEntityAdapter({
  selectId: (instance: Notif) => instance.idNotification as string,
  sortComparer: false,
});

export const initialState = notificationsAdapter.getInitialState();

const notificationsMS = "/notifications-api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getNotifications: builder.query({
      query: () => `${notificationsMS}/notifications`,
      transformResponse: (responseData: any) => {
        return notificationsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Notification", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Notification", id })),
      ],
    }),
    addNewNotification: builder.mutation({
      query: (initialNotification: Notif) => ({
        url: `${notificationsMS}/notifications`,
        method: "POST",
        body: {
          ...initialNotification,
        },
      }),
      invalidatesTags: [{ type: "Notification", id: "LIST" }],
    }),
    updateNotification: builder.mutation({
      query: (initialNotification: Notif) => ({
        url: `${notificationsMS}/notifications/${initialNotification.idNotification}`,
        method: "PUT",
        body: {
          ...initialNotification,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Notification", id: arg.id },
      ],
    }),
    deleteNotification: builder.mutation({
      query: ({ notificationId }: { notificationId: string }) => ({
        url: `${notificationsMS}/notifications/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Notification", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useAddNewNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = extendedApiSlice;

export const selectNotificationsResult =
  extendedApiSlice.endpoints.getNotifications.select();

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult: any) => notificationsResult.data
);

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
} = notificationsAdapter.getSelectors(
  (state: RootState) => selectNotificationsData(state) ?? initialState
);

export const selectNotifsByUser = createSelector(
  selectAllNotifications,
  (allNotifications: Notif[]) =>
    allNotifications.filter((notification: Notif) => true) // A CHANGER
);
