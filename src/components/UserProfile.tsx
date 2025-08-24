// src/components/UserProfile.tsx
import { useState, useEffect } from 'react'; // <-- Import useEffect
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { userIdentityAddress, userIdentityABI } from '../contracts';
// We only need the type, so we can use 'import type'
import type { UserIdentity } from '../typechain-types';

export function UserProfile() {
  const { address, isConnected } = useAccount();

  const [username, setUsername] = useState('');
  const [skills, setSkills] = useState('');

  // Wagmi Hook to READ data from the UserIdentity contract
  const { data: profile, isLoading: isProfileLoading, refetch } = useReadContract({
    address: userIdentityAddress,
    abi: userIdentityABI,
    functionName: 'getProfile',
    args: [address!],
    query: {
      enabled: isConnected,
    },
  });

  // Wagmi Hook to WRITE data (create a profile)
  const { data: hash, writeContract, isPending: isCreating, isSuccess: isCreateStarted } = useWriteContract();

  // Wagmi Hook to wait for the transaction to be mined
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // *** THE FIX IS HERE ***
  // Use a useEffect hook to react to the transaction being confirmed
  useEffect(() => {
    if (isConfirmed) {
      console.log('Profile created!');
      refetch(); // Refetch the profile data after the transaction is successful
    }
  }, [isConfirmed, refetch]);
  // ***********************

  const handleCreateProfile = () => {
    if (!username || !skills) {
      alert('Please fill out all fields.');
      return;
    }
    writeContract({
      address: userIdentityAddress,
      abi: userIdentityABI,
      functionName: 'createProfile',
      args: [username, skills, '0x'],
    });
  };

  if (!isConnected) return null;

  if (isProfileLoading) return <p>Loading profile...</p>;

  // Check if profile exists and userAddress is not the zero address
  if (profile && profile.userAddress !== '0x0000000000000000000000000000000000000000') {
    return (
      <div className="text-left">
        <h3 className="text-xl font-bold">Your Profile</h3>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Reputation:</strong> {profile.reputationScore.toString()}</p>
        <p><strong>Projects Completed:</strong> {profile.projectsCompleted.toString()}</p>
      </div>
    );
  }

  // If no profile exists, show the creation form
  return (
    <div className="text-left">
      <h3 className="text-xl font-bold">Create Your Profile</h3>
      <p className="text-gray-400 mb-4">You don't have a profile yet. Let's create one!</p>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Skills (e.g., Solidity, React)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2"
        />
        <button
          onClick={handleCreateProfile}
          disabled={isCreating || isConfirming}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500"
        >
          {isCreating ? 'Check Wallet...' : isConfirming ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </div>
    </div>
  );
}