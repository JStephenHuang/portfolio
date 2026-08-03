"use client";

import * as AirHockey from "@/components/primitives/AirHockey";
import defaultItems from "@/lib/data/root-items.json";
import { useItems } from "@/lib/hooks";
import { Image } from "@/components/ui/Image";
import React, { useState } from "react";
import styles from "./styles.module.scss";

const Home: React.FC = () => {
  const [friction, setFriction] = useState(0.15);
  const [bounce, setBounce] = useState(0.7);
  const { items, isLoading, savePosition, saveIndex } = useItems(defaultItems);

  return (
    <main className={styles.page}>
      <section className={styles.demo}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Physics playground</p>
            <h1>Air hockey</h1>
          </div>
          <p>Throw the items, tune the physics, or resize the table from its bottom-right corner.</p>
        </header>

        <div className={styles.controls}>
          <label className={styles.control}>
            <span>
              Surface friction <output>{friction.toFixed(2)}</output>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={friction}
              onChange={(event) => setFriction(event.currentTarget.valueAsNumber)}
            />
          </label>

          <label className={styles.control}>
            <span>
              Bounce <output>{bounce.toFixed(2)}</output>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={bounce}
              onChange={(event) => setBounce(event.currentTarget.valueAsNumber)}
            />
          </label>
        </div>

        <AirHockey.Root className={styles.rink} physics={{ friction, bounce }}>
          <div className={styles.centerLine} />
          <div className={styles.centerCircle} />
          <div className={`${styles.goal} ${styles.leftGoal}`} />
          <div className={`${styles.goal} ${styles.rightGoal}`} />

          {!isLoading &&
            items.map((item) => (
              <AirHockey.Item
                key={item.id}
                className={styles.puck}
                initialX={item.position.x}
                initialY={item.position.y}
                onPointerDown={() => saveIndex(item.id)}
                onSettle={({ x, y }) => savePosition(item.id, x, y)}
                style={{ zIndex: item.zIndex }}
              >
                <Image src={item.image} draggable={false} />
              </AirHockey.Item>
            ))}
        </AirHockey.Root>
      </section>
    </main>
  );
};

export default Home;
