"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Event } from "@/payload-types";
import { fetchEvents } from "./actions";

interface EventsContextType {
    ongoingEvents: Event[];
    upcomingEvents: Event[];
    pastEvents: Event[];
    isLoading: boolean;
}

const EventsContext = createContext<EventsContextType>({
    ongoingEvents: [],
    upcomingEvents: [],
    pastEvents: [],
    isLoading: true,
});

export const useEvents = () => useContext(EventsContext);

interface EventsProviderProps {
    children: React.ReactNode;
}

export function EventsProvider({ children }: EventsProviderProps) {
    const [ongoingEvents, setOngoingEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        Promise.all([fetchEvents("ongoing"), fetchEvents("upcoming"), fetchEvents("past")])
            .then(([ongoing, upcoming, past]) => {
                setOngoingEvents(ongoing);
                setUpcomingEvents(upcoming);
                setPastEvents(past);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                setOngoingEvents([]);
                setUpcomingEvents([]);
                setPastEvents([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); // only fetch on mount

    return (
        <EventsContext.Provider
            value={{
                ongoingEvents,
                upcomingEvents,
                pastEvents,
                isLoading,
            }}
        >
            {children}
        </EventsContext.Provider>
    );
}
