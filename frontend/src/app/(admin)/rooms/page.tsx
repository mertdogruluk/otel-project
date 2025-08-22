import React from 'react';

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
        <p className="text-muted-foreground">
          Manage hotel rooms and availability.
        </p>
      </div>
      
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Room management features will be available here.
        </p>
      </div>
    </div>
  );
}
