import { Edit3, Globe, Group, Shield, UserPlus, Zap } from "lucide-react";

export const features = [
    {
      icon: <UserPlus className="h-8 w-8 text-blue-600" />,
      title: "Add & Connect Friends",
      description: "Easily find and connect with friends using usernames. Build your network effortlessly."
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Real-Time Messaging",
      description: "Experience lightning-fast messaging with instant delivery. See when your friends are typing."
    },
    {
      icon: <Group className="h-8 w-8 text-purple-600" />,
      title: "Group Chats",
      description: "Create groups with your friends, family, or colleagues. Organize conversations and stay connected with multiple people at once."
    },
    {
      icon: <Edit3 className="h-8 w-8 text-orange-600" />,
      title: "Edit & Delete Messages",
      description: "Made a typo? No problem! Edit your messages or delete them entirely. You have full control over your conversations."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Secure & Private",
      description: "Your conversations are protected with end-to-end encryption. Chat with confidence knowing your privacy is our priority."
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: "Cross-Platform",
      description: "Access your chats from anywhere - desktop, mobile, or tablet. Your conversations sync seamlessly across all devices."
    }
  ];