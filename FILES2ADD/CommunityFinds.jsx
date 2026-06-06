import React from 'react';
import { ChevronUp, ChevronDown, MapPin, Clock, Package, Lock } from 'lucide-react';
import { communityFinds } from '../mockData';
import { Button } from './ui/button';

const CommunityFinds = () => {
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Storm':
        return 'text-purple-400';
      case 'Night':
        return 'text-blue-400';
      default:
        return 'text-teal-400';
    }
  };

  return (
    <div className="w-96 bg-[#0f0f10]/50 border-l border-gray-800 h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-4 border-b border-gray-800 bg-[#0a0a0b]/80 sticky top-0">
        <h2 className="text-lg font-semibold text-gray-200 mb-1">Latest community finds</h2>
        <p className="text-xs text-gray-500">Last 20 community reports (load more for older finds).</p>
        <div className="mt-3 flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-teal-600/20 text-teal-400 hover:bg-teal-600/30 border border-teal-600/30 text-xs"
          >
            Live
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 border-gray-700 text-gray-400 hover:text-gray-200 text-xs"
          >
            All maps
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-800">
        {communityFinds.map((find) => (
          <div key={find.id} className="p-4 hover:bg-gray-800/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-200">{find.blueprint}</h3>
              <span className="text-xs text-gray-500">{find.time}</span>
            </div>
            
            {find.reporter && (
              <p className="text-xs text-gray-500 mb-2">Reported by {find.reporter}</p>
            )}

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-400">{find.map}</span>
                <span className={`ml-auto ${getConditionColor(find.condition)}`}>
                  {find.condition}
                </span>
                {find.locked && (
                  <Lock className="w-3 h-3 text-yellow-500" />
                )}
              </div>
              
              {find.container && (
                <div className="flex items-center gap-2 text-xs">
                  <Package className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-400">Container</span>
                  <span className="text-gray-300">{find.container}</span>
                </div>
              )}
              
              {find.location && (
                <div className="flex items-start gap-2 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-gray-400">Location</span>
                    <p className="text-gray-300 mt-0.5">{find.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Button 
                variant="link" 
                className="text-teal-400 hover:text-teal-300 p-0 h-auto text-xs"
              >
                View more details
              </Button>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-gray-500 hover:text-teal-400 transition-colors">
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-xs">{find.upvotes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-400 transition-colors">
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-xs">{find.downvotes}</span>
                </button>
                <span className="text-xs text-gray-600">Sign in to vote</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="outline" 
          className="w-full border-gray-700 text-gray-400 hover:text-gray-200"
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default CommunityFinds;
