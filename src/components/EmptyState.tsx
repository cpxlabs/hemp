import React from 'react';
import { View } from 'react-native';
import { PackageOpen } from 'lucide-react-native';
import { Text } from './ui/text';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No products found in this category."
}) => {
  return (
    <View className="flex-1 items-center justify-center p-10 opacity-50">
      <PackageOpen size={64} color="white" strokeWidth={1} />
      <Text className="text-white text-center mt-4 font-medium italic">
        {message}
      </Text>
    </View>
  );
};
