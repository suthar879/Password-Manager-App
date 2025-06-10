"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

interface Password {
  website: string;
  username: string;
  password: string;
}

export async function addCard(
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  cardHolderName: string,
  userId: string
) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    let cards: Card[] = [];
    if (Array.isArray(user.privateMetadata.cards)) {
      cards = user.privateMetadata.cards || [];
      cards.push({ cardNumber, expiryDate, cvv, cardHolderName });
      console.log("******", userId, cards);
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          cards: cards,
        },
      });
    } else {
      console.log("******", userId, cards);
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          cards: [{ cardNumber, expiryDate, cvv, cardHolderName }],
        },
      });
    }
  } catch (error) {
    console.log("======", error);
  }
}

export async function addPassword(
  website: string,
  username: string,
  password: string,
  userId: string
) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    let passwords: Password[] = [];
    if (Array.isArray(user.privateMetadata.passwords)) {
      passwords = user.privateMetadata.passwords || [];
      passwords.push({ website, username, password });
      console.log("******", userId, passwords);
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          passwords: passwords,
        },
      });
    } else {
      console.log("******", userId, passwords);
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          passwords: [{ website, username, password }],
        },
      });
    }
  } catch (error) {
    console.log("======", error);
  }
}
