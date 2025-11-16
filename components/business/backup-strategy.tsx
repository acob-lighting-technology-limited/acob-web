'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Database,
  Cloud,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
} from 'lucide-react';

interface BackupStatus {
  lastBackup: Date | null;
  nextScheduled: Date;
  status: 'success' | 'pending' | 'failed' | 'in-progress';
  size: string;
  type: 'full' | 'incremental';
}

interface BackupStrategyProps {
  onBackupRequest?: () => Promise<void>;
  onRestoreRequest?: () => Promise<void>;
}

export function BackupStrategy({
  onBackupRequest,
  onRestoreRequest,
}: BackupStrategyProps) {
  const [backupStatus, setBackupStatus] = useState<BackupStatus>({
    lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    nextScheduled: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: 'success',
    size: '2.4 GB',
    type: 'incremental',
  });

  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleManualBackup = async () => {
    if (isBackingUp) {
      return;
    }

    setIsBackingUp(true);
    setBackupStatus(prev => ({ ...prev, status: 'in-progress' }));

    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 3000));

      if (onBackupRequest) {
        await onBackupRequest();
      }

      setBackupStatus(prev => ({
        ...prev,
        lastBackup: new Date(),
        status: 'success',
        type: 'full',
      }));
    } catch (error) {
      setBackupStatus(prev => ({ ...prev, status: 'failed' }));
      console.error('Backup failed:', error);
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = async () => {
    if (isRestoring) {
      return;
    }

    setIsRestoring(true);

    try {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 5000));

      if (onRestoreRequest) {
        await onRestoreRequest();
      }
    } catch (error) {
      console.error('Restore failed:', error);
    } finally {
      setIsRestoring(false);
    }
  };

  const getStatusColor = (status: BackupStatus['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: BackupStatus['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4" />;
      case 'in-progress':
        return <RefreshCw className="h-4 w-4 animate-spin" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Backup Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup Strategy Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Cloud className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Storage Location</p>
                <p className="text-xs text-muted-foreground">AWS S3 + Local</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Encryption</p>
                <p className="text-xs text-muted-foreground">AES-256</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Retention</p>
                <p className="text-xs text-muted-foreground">90 Days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Backup Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <Badge className={getStatusColor(backupStatus.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(backupStatus.status)}
                  {backupStatus.status.toUpperCase()}
                </div>
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Size: {backupStatus.size}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Last Backup:</p>
              <p className="text-muted-foreground">
                {backupStatus.lastBackup
                  ? backupStatus.lastBackup.toLocaleString()
                  : 'Never'}
              </p>
            </div>
            <div>
              <p className="font-medium">Next Scheduled:</p>
              <p className="text-muted-foreground">
                {backupStatus.nextScheduled.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleManualBackup}
              disabled={isBackingUp}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isBackingUp ? 'Backing Up...' : 'Manual Backup'}
            </Button>

            <Button
              variant="outline"
              onClick={handleRestore}
              disabled={isRestoring}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isRestoring ? 'Restoring...' : 'Restore'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Backup Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Full Backup</p>
                <p className="text-sm text-muted-foreground">
                  Complete system backup
                </p>
              </div>
              <Badge variant="secondary">Weekly (Sunday 2:00 AM)</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Incremental Backup</p>
                <p className="text-sm text-muted-foreground">
                  Changes since last backup
                </p>
              </div>
              <Badge variant="secondary">Daily (2:00 AM)</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Database Backup</p>
                <p className="text-sm text-muted-foreground">Database only</p>
              </div>
              <Badge variant="secondary">Every 6 Hours</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disaster Recovery Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Disaster Recovery Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                Recovery Time Objective (RTO)
              </h4>
              <p className="text-2xl font-bold text-primary">4 Hours</p>
              <p className="text-sm text-muted-foreground">
                Maximum time to restore critical systems
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                Recovery Point Objective (RPO)
              </h4>
              <p className="text-2xl font-bold text-primary">1 Hour</p>
              <p className="text-sm text-muted-foreground">
                Maximum data loss in case of disaster
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Recovery Procedures</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Assess the scope of the disaster</li>
              <li>Activate disaster recovery team</li>
              <li>Restore from latest backup</li>
              <li>Verify system integrity</li>
              <li>Communicate with stakeholders</li>
              <li>Document incident and lessons learned</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
