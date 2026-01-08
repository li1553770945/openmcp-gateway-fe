"use client";

import Link from "next/link";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MCPServer {
  id: number;
  name: string;
  description: string;
  url: string;
  isPublic: boolean;
  openProxy: boolean;
  createdAt: string;
  updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<{
    code: number;
    data: MCPServer[];
    message: string;
  }>("/api/mcpservers/public", fetcher);

  // Mock data for display if API is not available/returns error
  const servers = data?.data || [
      {
          id: 1,
          name: "示例 MCP 服务",
          description: "这是一个示例服务，用于演示界面效果。",
          url: "http://example.com/mcp",
          isPublic: true,
          openProxy: true,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
      }
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">MCPServer 列表</h1>
        <Link href="/mcpservers/create">
          <Button>添加服务</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-48 rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse bg-muted" />
             ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <Card key={server.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{server.name}</CardTitle>
                    {server.isPublic && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Public</span>}
                </div>
                <CardDescription>{server.url}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {server.description || "暂无描述"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                    ID: {server.id}
                </div>
                <div className="flex gap-2">
                    <Link href={`/mcpservers/${server.id}/edit`}>
                        <Button variant="outline" size="sm">编辑</Button>
                    </Link>
                    <Button variant="secondary" size="sm">详情</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
