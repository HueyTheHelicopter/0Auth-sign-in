import React, { useState, useEffect } from 'react';
import { Client } from 'ssh2-sftp-client';

const SFTPExample = () => {
  const [sftpClient, setSftpClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client();
    client
      .connect({
        host: 'https://06ED57024A11.rec.devel.prozeta.net',
        port: 9394,
        username: '06ED57024A11',
        password: 'zgcRrpCHcXHW9khcVavCPAyxCUYnqdns'
      })
      .then(() => {
        console.log('Connected to SFTP server');
        setSftpClient(client);
      })
      .catch((err) => {
        console.log('Failed to connect to SFTP server:', err);
      });

    return () => {
      // Clean up function to disconnect from the SFTP server when the component unmounts
      client.end().then(() => {
        console.log('Disconnected from SFTP server');
      });
    };
  }, []); // Run the effect only once

  return (
    <div>
      {sftpClient ? (
        <p>Connected to SFTP server</p>
      ) : (
        <p>Not connected to SFTP server</p>
      )}
    </div>
  );
};

export default SFTPExample;
