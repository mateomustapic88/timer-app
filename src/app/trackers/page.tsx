"use client";

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { TimerCard } from "@/components/TimerCard";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import { formatToday } from "@/helpers/dateUtils";

const Trackers = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timers, setTimers] = useState<
    {
      id: string;
      name: string;
      isActive: boolean;
      time: number;
      isPaused: boolean;
    }[]
  >([]);

  const startNewTimer = () => {
    if (activeTimer) {
      toast.warn("Only one timer can be active at a time!");
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name: "New Timer",
      isActive: true,
      time: 0,
      isPaused: false,
    };
    setTimers([newTimer, ...timers]);
    setActiveTimer(newTimer.id);
  };

  const stopTimer = async (timerId: string) => {
    // Ensure timers array and timerId are defined
    if (!timers || !timerId) {
      console.error("Timers or Timer ID is undefined");
      return;
    }

    // Find the timer to update and mark as stopped
    const updatedTimers = timers.map((timer) =>
      timer.id === timerId
        ? { ...timer, isActive: false, isPaused: false }
        : timer
    );
    setTimers(updatedTimers);
    setActiveTimer(null);

    try {
      if (!auth.currentUser?.uid) return;

      const userDocRef = doc(firestore, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      // Update Firestore document
      if (userDoc.exists()) {
        await updateDoc(userDocRef, { timers: updatedTimers });
      } else {
        await setDoc(userDocRef, { timers: updatedTimers });
      }
    } catch (error) {
      console.error("Error syncing timers:", error);
    }
  };

  const pauseTimer = (timerId: string) => {
    // Ensure timers array is defined
    if (!timers || !timerId) {
      console.error("Timers or Timer ID is undefined");
      return;
    }

    const timerToPause = timers.find((timer) => timer.id === timerId);

    if (!timerToPause || timerId !== activeTimer) {
      toast.warn(
        "Only the active timer can be paused or resumed. Please stop the active timer."
      );
      return;
    }

    const updatedTimers = timers.map((timer) =>
      timer.id === timerId ? { ...timer, isPaused: !timer.isPaused } : timer
    );

    setTimers(updatedTimers);
  };

  const deleteTimer = async (timerId: string) => {
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(updatedTimers);
    if (activeTimer === timerId) setActiveTimer(null);
    toast.info("Timer deleted");

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { timers: updatedTimers });
    } catch (error) {
      console.error("Error syncing timers:", error);
    }
  };

  const editTimer = async (timerId: string, newName: string) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === timerId ? { ...timer, name: newName } : timer
    );
    setTimers(updatedTimers);
    toast.success("Timer updated!");

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { timers: updatedTimers });
    } catch (error) {
      console.error("Error syncing timers:", error);
    }
  };

  const resetAllTimers = async () => {
    setTimers([]);
    setActiveTimer(null);

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { timers: [] });
    } catch (error) {
      console.error("Error syncing timers:", error);
    }
  };

  useEffect(() => {
    const syncTimers = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData?.timers) {
            setTimers(userData.timers);
            const activeTimer = userData.timers.find(
              (timer: { isActive: boolean; isPaused: boolean }) =>
                timer.isActive && !timer.isPaused
            );
            setActiveTimer(activeTimer?.id || null);
          }
        }
      } catch (error) {
        console.error("Error syncing timers:", error);
      }
    };

    syncTimers();
  }, []);

  return (
    <div className='trackers-page'>
      <h1>Today ({formatToday()})</h1>
      <div className='buttons-container'>
        <Button
          label='Start new timer'
          onClick={startNewTimer}
          className='p-button start-timer'
        />
        <Button
          label='Stop all'
          onClick={resetAllTimers}
          className='p-button reset-timers'
        />
      </div>
      <div className='timers-table-container'>
        <table className='timers-table'>
          <thead>
            <tr>
              <th>Time Logged</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timers.length > 0 ? (
              timers.map((timer) => (
                <TimerCard
                  key={timer.id}
                  timer={timer}
                  onStop={stopTimer}
                  onPause={() => pauseTimer(timer.id)}
                  onDelete={deleteTimer}
                  onEdit={editTimer}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className='no-timers-message'>
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

export default Trackers;
