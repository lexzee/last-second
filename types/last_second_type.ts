/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/last_second.json`.
 */
export type LastSecond = {
  address: "4f1Y7mjuvww8Mrxp8jb9Mg1thPv4VFRp2CWN1Gj4vAVL";
  address2: "8hThxmBTJD2D2sB919rGcLJ4N1Af9n9fheZrB8D99Urx";
  metadata: {
    name: "lastSecond";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "claim";
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210];
      accounts: [
        {
          name: "game";
          writable: true;
        },
        {
          name: "winner";
          writable: true;
          signer: true;
        }
      ];
      args: [];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "game";
          writable: true;
          signer: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "play";
      discriminator: [213, 157, 193, 142, 228, 56, 248, 150];
      accounts: [
        {
          name: "game";
          writable: true;
        },
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "gameState";
      discriminator: [144, 94, 208, 172, 248, 99, 134, 120];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "gameEnded";
      msg: "The game has already ended.";
    },
    {
      code: 6001;
      name: "timeExpired";
      msg: "Time has run out! Call claim instead.";
    },
    {
      code: 6002;
      name: "gameNotOver";
      msg: "The timer is still running!";
    },
    {
      code: 6003;
      name: "gameAlreadyClaimed";
      msg: "Pot already claimed.";
    },
    {
      code: 6004;
      name: "notTheWinner";
      msg: "You are not the last bidder.";
    }
  ];
  types: [
    {
      name: "gameState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "deadline";
            type: "i64";
          },
          {
            name: "potAmount";
            type: "u64";
          },
          {
            name: "lastBidder";
            type: "pubkey";
          },
          {
            name: "gameActive";
            type: "bool";
          }
        ];
      };
    }
  ];
};
