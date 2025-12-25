/**
 * useNetwork Hook
 * 
 * Track network connectivity state.
 */

import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface UseNetworkResult {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  connectionType: string | null;
  isLoading: boolean;
}

export function useNetwork(): UseNetworkResult {
  const [state, setState] = useState<UseNetworkResult>({
    isConnected: null,
    isInternetReachable: null,
    connectionType: null,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((netInfoState: NetInfoState) => {
      setState({
        isConnected: netInfoState.isConnected,
        isInternetReachable: netInfoState.isInternetReachable,
        connectionType: netInfoState.type,
        isLoading: false,
      });
    });

    // Get initial state
    NetInfo.fetch().then((netInfoState) => {
      setState({
        isConnected: netInfoState.isConnected,
        isInternetReachable: netInfoState.isInternetReachable,
        connectionType: netInfoState.type,
        isLoading: false,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}

export default useNetwork;

