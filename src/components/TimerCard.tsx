import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

interface TimerCardProps {
  timer: {
    id: string;
    name: string;
    isActive: boolean;
    isPaused: boolean;
    time: number;
  };
  onStop: (id: string) => void;
  onPause: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}

export const TimerCard = ({
  timer,
  onStop,
  onPause,
  onEdit,
  onDelete,
}: TimerCardProps) => {
  const [currentTime, setCurrentTime] = useState(timer.time);
  const [timerName, setTimerName] = useState(timer.name);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isActive && !timer.isPaused) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isActive, timer.isPaused]);

  const handleStop = () => onStop(timer.id);
  const handlePause = () => onPause(timer.id);
  const handleDelete = () => onDelete(timer.id);

  const handleEdit = () => setIsEditing(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTimerName(e.target.value);

  const handleBlur = () => {
    onEdit(timer.id, timerName);
    setIsEditing(false);
  };

  const formattedTime = `${String(Math.floor(currentTime / 60)).padStart(
    2,
    "0"
  )}:${String(currentTime % 60).padStart(2, "0")}`;

  return (
    <tr className='timer-row'>
      <td className='timer-display'>{formattedTime}</td>
      <td className='timer-name'>
        <input
          type='text'
          value={timerName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          className={`timer-name-input ${isEditing ? "editing" : ""}`}
          disabled={!isEditing}
        />
      </td>
      <td className='timer-actions'>
        <Button
          icon={timer.isPaused ? "pi pi-play" : "pi pi-pause"}
          onClick={handlePause}
          className='p-button-icon-only pause-button'
          disabled={!timer.isActive}
        />
        <Button
          icon='pi pi-stop'
          onClick={handleStop}
          className='p-button-icon-only stop-button'
          disabled={!timer.isActive}
        />
        <Button
          icon='pi pi-pencil'
          onClick={handleEdit}
          className='p-button-icon-only edit-button'
        />
        <Button
          icon='pi pi-trash'
          onClick={handleDelete}
          className='p-button-icon-only delete-button'
        />
      </td>
    </tr>
  );
};
