"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate, formatTime } from "@/helpers/dateUtils";

interface TimerHistory {
  id: string;
  name: string;
  duration: number;
  timestamp: string;
  date: string;
}

const HistoryPage = () => {
  // Mocked data
  const [history, setHistory] = useState<TimerHistory[]>([
    {
      id: "1",
      name: "Jira-123",
      duration: 3723,
      timestamp: "2024-08-15T10:00:00Z",
      date: "2024-08-20",
    },
    {
      id: "2",
      name: "Jira-124",
      duration: 4388,
      timestamp: "2024-08-15T14:20:00Z",
      date: "2024-08-15",
    },
    {
      id: "3",
      name: "Jira-125",
      duration: 3620,
      timestamp: "2024-11-13T11:15:00Z",
      date: "2024-11-13",
    },
  ]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");

  const handleEditDescription = (id: string, newName: string) => {
    setHistory((prevHistory) =>
      prevHistory.map((timer) =>
        timer.id === id ? { ...timer, name: newName } : timer
      )
    );
    toast.success("Timer updated!");
  };

  const handleDelete = (id: string) => {
    setHistory((prevHistory) => prevHistory.filter((timer) => timer.id !== id));
    toast.info("Timer deleted");
  };

  const handleEditClick = (id: string, currentName: string) => {
    setEditingId(id);
    setNewDescription(currentName);
  };

  const handleSaveEdit = (id: string) => {
    if (newDescription.trim()) {
      handleEditDescription(id, newDescription);
      setEditingId(null);
    }
  };

  const filteredHistory = history.filter((timer) => {
    const timerDate = new Date(timer.timestamp);

    const normalizedStartDate = startDate
      ? new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
      : null;
    const normalizedEndDate = endDate
      ? new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          23,
          59,
          59
        )
      : null;

    const isAfterStartDate = normalizedStartDate
      ? timerDate >= normalizedStartDate
      : true;
    const isBeforeEndDate = normalizedEndDate
      ? timerDate <= normalizedEndDate
      : true;

    const matchesDescription =
      !searchText ||
      timer.name.toLowerCase().includes(searchText.toLowerCase());

    return isAfterStartDate && isBeforeEndDate && matchesDescription;
  });

  return (
    <div className='history-page'>
      <h1>Trackers History</h1>
      <div className='filters'>
        <div className='filter-item'>
          <label htmlFor='startDate'>Start Date</label>
          <Calendar
            id='startDate'
            value={startDate}
            onChange={(e) => setStartDate(e.value ?? null)}
            placeholder='From start date'
            showIcon
          />
        </div>
        <div className='filter-item'>
          <label htmlFor='endDate'>End Date</label>
          <Calendar
            id='endDate'
            value={endDate}
            onChange={(e) => setEndDate(e.value ?? null)}
            placeholder='To end date'
            showIcon
          />
        </div>
        <div className='filter-item'>
          <label htmlFor='searchText'>Description Contains</label>
          <InputText
            id='searchText'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Description contains'
          />
        </div>
      </div>
      <div className='timers-table-container'>
        <table className='timers-table'>
          <thead>
            <tr>
              <th>Time Logged</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((timer) => (
                <tr key={timer.id} className='timer-row'>
                  <td>{formatTime(timer.timestamp)}</td>
                  <td>{formatDate(timer.date)}</td>
                  <td>
                    {editingId === timer.id ? (
                      <InputText
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        onBlur={() => handleSaveEdit(timer.id)}
                      />
                    ) : (
                      <span>{timer.name}</span>
                    )}
                  </td>
                  <td className='timer-actions'>
                    <Button
                      icon='pi pi-pencil'
                      className='p-button-icon-only edit-button'
                      onClick={() => handleEditClick(timer.id, timer.name)}
                    />
                    <Button
                      icon='pi pi-trash'
                      className='p-button-icon-only delete-button'
                      onClick={() => handleDelete(timer.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='no-timers-message'>
                  No Timers
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HistoryPage;
